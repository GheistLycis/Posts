'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { useCommentModal } from './hooks/useCommentModal';

export interface CommentModalProps {
  postId: number;
  onComment: () => void;
}

export interface CommentModalHandle {
  open: () => void;
  close: () => void;
}

const MAX_CONTENT_LEN = 1000;

const CommentModal: ForwardRefRenderFunction<
  CommentModalHandle,
  CommentModalProps
> = ({ postId, onComment }, ref) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    control,
    errors,
    isValid,
    isSubmitting,
    submit,
  } = useCommentModal({ postId, onComment, ref });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      className="max-w-[660px]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="md:text-[22px]">Leave comment</ModalHeader>

            <ModalBody className="gap-5">
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    isInvalid={!!errors[field.name]}
                    errorMessage={errors[field.name]?.message}
                    label="Content"
                    placeholder="Content here"
                    aria-label="Post content input"
                    labelPlacement="outside"
                    variant="bordered"
                    isClearable
                    minRows={3}
                    maxRows={3}
                    maxLength={MAX_CONTENT_LEN}
                    onKeyDown={(e) => e.key === 'Esc' && e.preventDefault()}
                    size="sm"
                    classNames={{
                      input: 'placeholder-[#CCC]!',
                      label: 'text-sm md:text-base',
                    }}
                  />
                )}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                onPress={onClose}
                size="sm"
                className="text-title w-[120px] border border-black bg-white text-base font-bold"
              >
                Cancel
              </Button>

              <Button
                isDisabled={!isValid}
                isLoading={isSubmitting}
                onPress={submit}
                size="sm"
                className="bg-green w-[120px] text-base font-bold text-white"
              >
                Comment
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(CommentModal);
