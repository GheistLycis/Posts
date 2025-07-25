import { toast } from '@components/Toast/Toast';
import { BffErrorPayload } from 'app/api/utils/types/Api/BffErrorPayload';
import { handleErrorMessage } from './handleErrorMessage/handleErrorMessage';

type Options<T> = {
  headers: HeadersInit;
  successToast: string;
  errorToast: string;
} & (
  | {
      method: 'GET' | 'DELETE';
      body: undefined;
    }
  | {
      method: 'POST' | 'PUT' | 'PATCH';
      body: T;
    }
);

export const fetchApi = async <TRes = unknown, TBody = undefined>(
  url: string,
  options: Partial<Options<TBody>> = { method: 'GET' }
): Promise<TRes> => {
  const { method, body, headers, successToast, errorToast } = options;

  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    const data: unknown = await res.json();

    if (res.ok) {
      if (successToast) toast.success({ message: successToast });

      return data as TRes;
    }
    handleErrorMessage(res.status, data as BffErrorPayload, errorToast);

    return Promise.reject(data);
  } catch (error) {
    if (errorToast) toast.error({ message: errorToast });

    return Promise.reject(error);
  }
};
