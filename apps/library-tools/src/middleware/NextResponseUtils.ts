import { NextResponse } from 'next/server';

export interface NextResponseUtils {
  createNextResponse(): NextResponse;
  createRedirectResponse(newPathname: string, requestUrl: URL): NextResponse;
}
