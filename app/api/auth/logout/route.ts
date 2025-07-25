import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { Handler } from 'app/api/utils/types/Api/Handler';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const LOG_TAG = 'auth/logout';

export const POST: Handler = async (req) => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete('user');
    cookieStore.delete('return_url');

    return NextResponse.json(undefined);
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};
