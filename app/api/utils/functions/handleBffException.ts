import { NextResponse } from 'next/server';
import { BffError } from '../types/api/BffErrorPayload';
import { logBffException } from './observability/logBffException';

export const handleBffException = (
  error: unknown,
  methodIdentifier: string
): NextResponse<BffError> => {
  logBffException(error, methodIdentifier);

  return NextResponse.json(
    { bffError: error },
    { status: 500, statusText: 'BFF Exception' }
  );
};
