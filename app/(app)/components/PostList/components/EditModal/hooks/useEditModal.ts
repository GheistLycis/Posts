import { useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@utils/fetch/fetch';
import { maliciousInputValidator } from '@utils/validators/maliciousInputValidator';
import { GetPostRes } from 'app/api/utils/types/post/GetPostRes';
import { PatchPostReq } from 'app/api/utils/types/post/PatchPostReq';
import {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  useTransition,
} from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditModalHandle } from '../EditModal';

export interface UseEditModalProps {
  onEdit: () => void;
  ref: ForwardedRef<EditModalHandle>;
}

export interface UseEditModal {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
  isLoading: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  submit: () => Promise<void>;
}

type FormSchema = z.infer<typeof formSchema>;

const MIN_CONTENT_LEN = 10;

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

export const useEditModal = ({
  onEdit,
  ref,
}: UseEditModalProps): UseEditModal => {
  const [id, setId] = useState<number>();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, startTransition] = useTransition();

  const { data, isLoading } = useQuery({
    queryFn: () => fetchApi<GetPostRes>(`/api/post/${id}`),
    queryKey: ['post', id],
    enabled: !!id,
  });

  const { control, formState, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { title: '', content: '' },
  });
  const { errors, isValid } = formState;

  const submit = handleSubmit(({ title, content }: FormSchema) =>
    startTransition(() =>
      fetchApi<unknown, PatchPostReq>(`/api/post/${id}`, {
        method: 'PATCH',
        body: { title, content },
        successToast: 'Post edited!',
        errorToast: 'Failed to edit post',
      }).then(() => {
        onEdit();
        onClose();
      })
    )
  );

  const handleOpen = useCallback(
    (id: number) => {
      setId(id);
      onOpen();
    },
    [onOpen]
  );

  useImperativeHandle(ref, () => ({ open: handleOpen, close: onClose }));

  useEffect(() => {
    reset({
      title: data?.title ?? '',
      content: data?.content ?? '',
    });
  }, [reset, data]);

  return {
    isOpen,
    onClose,
    onOpenChange,
    control,
    errors,
    isLoading,
    isValid,
    isSubmitting,
    submit,
  };
};
