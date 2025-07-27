import { NextResponse } from 'next/server';
import { NextResponseUtils } from './NextResponseUtils.ts';

export class NextResponseUtilsImpl implements NextResponseUtils {
  createNextResponse() {
    return NextResponse.next();
  }
  createRedirectResponse(newPathname: string, requestUrl: URL) {
    return NextResponse.redirect(new URL(newPathname, requestUrl));
  }
}
