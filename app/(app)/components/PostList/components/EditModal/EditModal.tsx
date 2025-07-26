'use client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Textarea,
} from '@heroui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { useEditModal } from './hooks/useEditModal';

export interface EditModalProps {
  onEdit: () => void;
}

export interface EditModalHandle {
  open: (id: number) => void;
  close: () => void;
}

const MAX_CONTENT_LEN = 3000;

const EditModal: ForwardRefRenderFunction<EditModalHandle, EditModalProps> = (
  { onEdit },
  ref
) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    control,
    errors,
    isLoading,
    isValid,
    isSubmitting,
    submit,
  } = useEditModal({ onEdit, ref });

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
            <ModalHeader className="md:text-[22px]">Edit item</ModalHeader>

            <ModalBody className="gap-5">
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Input
                      {...field}
                      isInvalid={!!errors[field.name]}
                      errorMessage={errors[field.name]?.message}
                      onKeyDown={(e) => e.key === 'Esc' && e.preventDefault()}
                      label="Title"
                      placeholder="Hello world"
                      aria-label="Post title input"
                      labelPlacement="outside"
                      variant="bordered"
                      size="sm"
                      classNames={{
                        input: 'placeholder-[#CCC]!',
                        label: 'text-sm md:text-base',
                      }}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <Controller
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      isInvalid={!!errors[field.name]}
                      errorMessage={errors[field.name]?.message}
                      onKeyDown={(e) => e.key === 'Esc' && e.preventDefault()}
                      label="Content"
                      placeholder="Content here"
                      aria-label="Post content input"
                      labelPlacement="outside"
                      variant="bordered"
                      isClearable
                      minRows={3}
                      maxRows={3}
                      maxLength={MAX_CONTENT_LEN}
                      size="sm"
                      classNames={{
                        input: 'placeholder-[#CCC]!',
                        label: 'text-sm md:text-base',
                      }}
                    />
                  )}
                />
              </Skeleton>
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
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(EditModal);
