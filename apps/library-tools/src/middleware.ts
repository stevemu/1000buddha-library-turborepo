import { NextRequest, NextResponse } from 'next/server';
import { Middleware } from './middleware/Middleware.ts';
import { SessionHandlerImpl } from './middleware/SessionHandlerImpl.ts';
import { NextResponseUtilsImpl } from './middleware/NextResponseUtilsImpl.ts';

export default async function middleware(req: NextRequest) {
  if (isServerAction(req)) {
    return NextResponse.next();
  }

  const middleware = new Middleware();
  middleware.setSessionHandler(new SessionHandlerImpl());
  middleware.setNextResponseUtils(new NextResponseUtilsImpl());
  return middleware.handle(req.nextUrl);
}

const isServerAction = (req: NextRequest) => req.headers.get('next-action');

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
