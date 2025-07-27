import { toast } from '@components/Toast/Toast';
import { FILE } from '@constants/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchApi } from '@utils/fetch/fetch';
import { maliciousInputValidator } from '@utils/validators/maliciousInputValidator';
import { CreatePostReq } from 'app/api/utils/types/post/CreatePostReq';
import { CreatePostRes } from 'app/api/utils/types/post/CreatePostRes';
import { RefObject, useRef, useTransition } from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

interface UseNewPost {
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
  isLoading: boolean;
  isValid: boolean;
  submit: () => Promise<void>;
  uploadInputRef: RefObject<HTMLInputElement | null>;
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
  file: z
    .instanceof(File)
    .optional()
    .refine(
      (v) => !v || v.type in FILE.ACCEPTED_TYPES,
      `File type not supported (only ${Object.values(FILE.ACCEPTED_TYPES)
        .join(', ')
        .replace(/, ([^,]*)$/, ' and $1')})`
    )
    .refine(
      (v) => !v || v.size / (1024 * 1024) <= FILE.MAX_SIZE_MB,
      `Max size of ${FILE.MAX_SIZE_MB} MB exceeded`
    ),
});

export const useNewPost = (): UseNewPost => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, startTransition] = useTransition();

  const { control, formState, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { title: '', content: '' },
  });
  const { errors, isValid } = formState;

  const submit = handleSubmit(({ title, content, file }: FormSchema) =>
    startTransition(async () => {
      let base64: string | undefined;

      if (file) {
        base64 = await file
          .arrayBuffer()
          .catch((err) => {
            toast.error({ message: 'Failed to load file' });

            return Promise.reject(err);
          })
          .then((buff) => {
            const content = Buffer.from(buff).toString('base64');

            return `data:${file.type};base64,${content}`;
          });
      }

      return fetchApi<CreatePostRes, CreatePostReq>('/api/post', {
        method: 'POST',
        body: {
          title,
          content,
          file: base64,
        },
        successToast: 'Post created!',
        errorToast: 'Failed to create post',
      }).then(() => {
        document.dispatchEvent(postCreatedEvent);
        reset();
      });
    })
  );

  return { uploadInputRef, control, errors, isLoading, isValid, submit };
};
