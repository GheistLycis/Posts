import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  if (!isAuthenticated(req) && !isAuthRoute(req)) {
    const res = NextResponse.redirect(new URL('/login', req.url));

    res.cookies.set('return_url', req.nextUrl.pathname, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    return res;
  }

  return NextResponse.next();
};

const isAuthRoute = (req: NextRequest): boolean =>
  req.nextUrl.pathname.startsWith('/login');

const isAuthenticated = (req: NextRequest): boolean =>
  !!req.cookies.get('user')?.value;

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
