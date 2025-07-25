import { NextResponse } from 'next/server';
import { ApiError } from '../types/api/BffErrorPayload';
import { LogSeverity } from '../types/api/LogSeverity';
import { logServerException } from './observability/logServerException';

const HTTP_STATUS_TO_LOG: Record<number, LogSeverity> = {
  500: 'error',
  501: 'warning',
  502: 'warning',
  503: 'warning',
  504: 'warning',
};

export const handleFailedRequest = async (
  res: Response,
  methodIdentifier: string
): Promise<NextResponse<ApiError>> => {
  const apiError: ApiError['apiError'] = await res
    .json()
    .catch(() => undefined);

  if (res.status in HTTP_STATUS_TO_LOG)
    logServerException(
      res,
      apiError,
      methodIdentifier,
      HTTP_STATUS_TO_LOG[res.status]
    );

  return NextResponse.json(
    { apiError },
    { status: res.status, statusText: res.statusText }
  );
};
