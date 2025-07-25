import { toast } from '@components/Toast/Toast';
import { BffErrorPayload } from 'app/api/utils/types/Api/BffErrorPayload';

const HTTP_STATUS_NOT_TO_POP_TOAST = [401, 403];

export const handleErrorMessage = (
  status: number,
  payload: BffErrorPayload,
  defaultMessage?: string
): void => {
  if (HTTP_STATUS_NOT_TO_POP_TOAST.includes(status)) return;

  if ('apiError' in payload) {
    const { apiError } = payload;

    if (typeof apiError === 'string') {
      toast.error({ message: apiError });

      return;
    }
  }

  if (defaultMessage) toast.error({ message: defaultMessage });
};
