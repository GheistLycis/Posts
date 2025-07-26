'use client';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { useConfirmationModal } from './hooks/useConfirmationModal';

export interface ConfirmationModalProps {
  onCancel?: (data?: unknown) => void;
  onConfirm?: (data?: unknown) => void;
}

export interface ConfirmationModalHandle {
  open: (data?: unknown) => void;
  close: () => void;
}

const ConfirmationModal: ForwardRefRenderFunction<
  ConfirmationModalHandle,
  ConfirmationModalProps
> = ({ onCancel, onConfirm }, ref) => {
  const { handleCancel, handleConfirm, isOpen, onClose, onOpenChange } =
    useConfirmationModal({ onCancel, onConfirm, ref });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      hideCloseButton
      className="max-w-[660px]"
    >
      <ModalContent>
        <ModalHeader className="md:text-[22px]">
          Are you sure you want to delete this item?
        </ModalHeader>

        <ModalFooter>
          <Button
            onPress={handleCancel}
            size="sm"
            className="text-title border-gray w-[120px] border bg-white text-base font-bold"
          >
            Cancel
          </Button>

          <Button
            onPress={handleConfirm}
            size="sm"
            className="bg-red w-[120px] text-base font-bold text-white"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ConfirmationModal);
