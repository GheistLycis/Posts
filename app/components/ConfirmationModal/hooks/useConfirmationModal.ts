import { useDisclosure } from '@heroui/react';
import {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { ConfirmationModalHandle } from '../ConfirmationModal';

export interface UseConfirmationModalProps {
  onCancel?: (data?: unknown) => void;
  onConfirm?: (data?: unknown) => void;
  ref: ForwardedRef<ConfirmationModalHandle>;
}

export interface UseConfirmationModal {
  handleCancel: () => void;
  handleConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const useConfirmationModal = ({
  onCancel,
  onConfirm,
  ref,
}: UseConfirmationModalProps): UseConfirmationModal => {
  const [data, setData] = useState<unknown>();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel(data);
    onClose();
  }, [onCancel, onClose, data]);

  const handleConfirm = useCallback(() => {
    if (onConfirm) onConfirm(data);
    onClose();
  }, [onConfirm, onClose, data]);

  const handleOpen = (_data?: unknown) => {
    setData(_data);
    onOpen();
  };

  useImperativeHandle(ref, () => ({ open: handleOpen, close: onClose }));

  return { handleCancel, handleConfirm, isOpen, onClose, onOpenChange };
};
