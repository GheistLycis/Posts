import { handleBffException } from 'app/api/utils/functions/handleBffException';
import { Handler } from 'app/api/utils/types/api/Handler';
import { LoginReq } from 'app/api/utils/types/auth/LoginReq';
import { NextResponse } from 'next/server';

const LOG_TAG = 'auth/magic-link/request';

export const POST: Handler<null> = async (req) => {
  try {
    const body: LoginReq = await req.json();
    const response = NextResponse.json(null);

    response.cookies.set({
      name: 'user',
      value: body.user,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return handleBffException(error, `${req.method} - ${LOG_TAG}`);
  }
};
