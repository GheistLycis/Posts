import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { Handler } from 'app/api/utils/types/api/Handler';
import { NextResponse } from 'next/server';

const LOG_TAG = 'post/:id/like';

export const POST: Handler<null, 'id'> = async (req) => {
  try {
    return NextResponse.json(null);
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};
