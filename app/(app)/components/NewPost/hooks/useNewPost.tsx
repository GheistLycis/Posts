import { useSessionContext } from '@contexts/SessionContext/useSessionContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchApi } from '@utils/fetch/fetch';
import { maliciousInputValidator } from '@utils/validators/maliciousInputValidator';
import { CreatePostReq } from 'app/api/utils/types/post/CreatePostReq';
import { CreatePostRes } from 'app/api/utils/types/post/CreatePostRes';
import { useTransition } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

interface UseNewPost {
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
  isLoading: boolean;
  isValid: boolean;
  submit: () => Promise<void>;
}

type FormSchema = z.infer<typeof formSchema>;

const MIN_CONTENT_LEN = 10;

export const postCreatedEvent = new Event('postCreated');

const formSchema = z.object({
  title: z
    .string()
    .nonempty('Enter the post title')
    .refine(maliciousInputValidator, 'Malicious input detected!'),
  content: z
    .string()
    .nonempty('Enter the content')
    .refine(
      (v) => v.trim().length >= MIN_CONTENT_LEN,
      `The content must have at least ${MIN_CONTENT_LEN} characters`
    )
    .refine(maliciousInputValidator, 'Malicious input detected!'),
});

export const useNewPost = (): UseNewPost => {
  const { user } = useSessionContext();
  const [isLoading, startTransition] = useTransition();

  const { control, formState, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { title: '', content: '' },
  });
  const { errors, isValid } = formState;

  const submit = handleSubmit(({ title, content }: FormSchema) =>
    startTransition(() =>
      fetchApi<CreatePostRes, CreatePostReq>('/api/post', {
        method: 'POST',
        body: { title, content, username: user!.name },
        successToast: 'Post created!',
        errorToast: 'Failed to create post',
      }).then(() => {
        document.dispatchEvent(postCreatedEvent);
        reset();
      })
    )
  );

  return { control, errors, isLoading, isValid, submit };
};
