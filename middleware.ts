import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
  const isAuth = isAuthenticated(req);
  const isAuthRoute = isAuthenticationRoute(req);

  if (!isAuth && !isAuthRoute) {
    const res = NextResponse.redirect(new URL('/login', req.url));

    res.cookies.set('return_url', req.nextUrl.pathname, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    return res;
  }

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};

const isAuthenticationRoute = (req: NextRequest): boolean =>
  req.nextUrl.pathname.startsWith('/login');

const isAuthenticated = (req: NextRequest): boolean =>
  !!req.cookies.get('user')?.value;

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
