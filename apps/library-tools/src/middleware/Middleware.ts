import { SessionHandler } from './SessionHandler.ts';
import { NextResponseUtils } from './NextResponseUtils.ts';
import { Pages } from '../pages.ts';

const protectedRoutes = [Pages.BOOKS, Pages.LIBRARY_CARDS, Pages.NOTES];
const publicRoutes = [Pages.LOGIN];

export class Middleware {
  private sessionHandler!: SessionHandler;
  private nextResponseUtils!: NextResponseUtils;

  setSessionHandler(sessionHandler: SessionHandler) {
    this.sessionHandler = sessionHandler;
  }

  setNextResponseUtils(nextResponseUtils: NextResponseUtils) {
    this.nextResponseUtils = nextResponseUtils;
  }

  async handle(url: URL) {
    const path = url.pathname;

    if (path === Pages.HOME) {
      return this.nextResponseUtils.createNextResponse();
    }

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const session = await this.sessionHandler.getSession();

    if (isProtectedRoute && !session.isLoggedIn) {
      return this.nextResponseUtils.createRedirectResponse(Pages.LOGIN, url);
    }

    if (isPublicRoute && session.isLoggedIn) {
      return this.nextResponseUtils.createRedirectResponse(Pages.BOOKS, url);
    }

    if (isProtectedRoute && session.isLoggedIn) {
      await this.sessionHandler.extendSession();
    }

    return this.nextResponseUtils.createNextResponse();
  }
}
