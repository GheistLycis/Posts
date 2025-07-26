import { useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchApi } from '@utils/fetch/fetch';
import { maliciousInputValidator } from '@utils/validators/maliciousInputValidator';
import { CommentPostReq } from 'app/api/utils/types/post/CommentPostReq';
import { CommentPostRes } from 'app/api/utils/types/post/CommentPostRes';
import {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useTransition,
} from 'react';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CommentModalHandle } from '../CommentModal';

export interface UseCommentModalProps {
  postId: number;
  onComment: () => void;
  ref: ForwardedRef<CommentModalHandle>;
}

export interface UseCommentModal {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  control: Control<FormSchema>;
  errors: FieldErrors<FormSchema>;
  isValid: boolean;
  isSubmitting: boolean;
  submit: () => Promise<void>;
}

type FormSchema = z.infer<typeof formSchema>;

const MIN_CONTENT_LEN = 5;

const formSchema = z.object({
  content: z
    .string()
    .nonempty('Enter the content')
    .refine(
      (v) => v.trim().length >= MIN_CONTENT_LEN,
      `The content must have at least ${MIN_CONTENT_LEN} characters`
    )
    .refine(maliciousInputValidator, 'Malicious input detected!'),
});

export const useCommentModal = ({
  postId,
  onComment,
  ref,
}: UseCommentModalProps): UseCommentModal => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, startTransition] = useTransition();

  const { control, formState, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { content: '' },
  });
  const { errors, isValid } = formState;

  const submit = handleSubmit(({ content }: FormSchema) =>
    startTransition(() =>
      fetchApi<CommentPostRes, CommentPostReq>(`/api/post/${postId}/comment`, {
        method: 'POST',
        body: { content },
        successToast: 'Comment submitted!!',
        errorToast: 'Failed to comment post',
      }).then(() => {
        onComment();
        onClose();
      })
    )
  );

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useImperativeHandle(ref, () => ({ open: onOpen, close: onClose }));

  return {
    isOpen,
    onClose,
    onOpenChange,
    control,
    errors,
    isValid,
    isSubmitting,
    submit,
  };
};
