import { NextResponseUtils } from '../NextResponseUtils.ts';
import { NextResponse } from 'next/server';

const nextResponseDummy = new NextResponse();

export class NextResponseUtilsSpy implements NextResponseUtils {
  public createNextResponseCalled = false;
  private redirectResponseCalledWith: string | null = null;

  createNextResponse() {
    this.createNextResponseCalled = true;
    return nextResponseDummy;
  }
  createRedirectResponse(newPathname: string, requestUrl: URL) {
    this.redirectResponseCalledWith = `${newPathname},${JSON.stringify(requestUrl)}`;
    return nextResponseDummy;
  }

  public verifyCreateRedirectResponseCalledWith(newPathname: string, requestUrl: URL) {
    return this.redirectResponseCalledWith === `${newPathname},${JSON.stringify(requestUrl)}`;
  }
}
