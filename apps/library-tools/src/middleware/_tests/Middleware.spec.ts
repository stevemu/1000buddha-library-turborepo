import { describe, it, expect, beforeEach } from '@jest/globals';
import { Middleware } from '../Middleware.ts';
import { NextResponseUtilsSpy } from './NextResponseUtilsSpy.ts';
import { UnauthenticatedSessionHandlerStub } from './UnauthenticatedSessionHandlerStub.ts';
import { AuthenticatedSessionHandlerSpy } from './AuthenticatedSessionHandlerSpy.ts';
import { Pages } from '../../pages.ts';

describe('Middleware', () => {
  let middleware: Middleware;
  let nextResponseUtilsSpy: NextResponseUtilsSpy;
  const PROTECTED_ROUTES = [Pages.BOOKS, Pages.LIBRARY_CARDS, Pages.NOTES];

  beforeEach(() => {
    middleware = new Middleware();
    nextResponseUtilsSpy = new NextResponseUtilsSpy();
    middleware.setNextResponseUtils(nextResponseUtilsSpy);
  });

  it('should ignore home page', async () => {
    const urlStub = createUrlStub(Pages.HOME);
    await middleware.handle(urlStub);

    expect(nextResponseUtilsSpy.createNextResponseCalled).toBe(true);
  });

  describe('when not logged in', () => {
    let notLoggedInSessionHandlerStub: UnauthenticatedSessionHandlerStub;

    beforeEach(() => {
      notLoggedInSessionHandlerStub = new UnauthenticatedSessionHandlerStub();
      middleware.setSessionHandler(notLoggedInSessionHandlerStub);
    });

    it('when request path is login page, should do nothing', async () => {
      const urlStub = createUrlStub(Pages.LOGIN);
      await middleware.handle(urlStub);

      expect(nextResponseUtilsSpy.createNextResponseCalled).toBeTruthy();
    });

    it('when request path is a protected route, should redirect to login page', async () => {
      for (const path of PROTECTED_ROUTES) {
        await expectShouldRedirectToLogin(path);
      }
    });

    const expectShouldRedirectToLogin = async (requestPathname: string) => {
      const urlStub = createUrlStub(requestPathname);
      await middleware.handle(urlStub);

      expect(
        nextResponseUtilsSpy.verifyCreateRedirectResponseCalledWith('/login', urlStub),
      ).toBeTruthy();
    };
  });

  describe('when logged in', () => {
    let loggedInSessionHandlerStub: AuthenticatedSessionHandlerSpy;

    beforeEach(() => {
      loggedInSessionHandlerStub = new AuthenticatedSessionHandlerSpy();
      middleware.setSessionHandler(loggedInSessionHandlerStub);
    });

    it('when request path is login page, should redirect to books page', async () => {
      const urlStub = createUrlStub(Pages.LOGIN);
      await middleware.handle(urlStub);

      expect(
        nextResponseUtilsSpy.verifyCreateRedirectResponseCalledWith('/books', urlStub),
      ).toBeTruthy();
    });

    describe('when request path is a protect route', () => {
      it('should do nothing', async () => {
        const expectToDoNothing = async (requestPathname: string) => {
          const urlStub = createUrlStub(requestPathname);
          await middleware.handle(urlStub);
          expect(nextResponseUtilsSpy.createNextResponseCalled).toBeTruthy();
        };

        for (const path of PROTECTED_ROUTES) {
          await expectToDoNothing(path);
        }
      });

      it('should extend session', async () => {
        const expectToExtendSession = async (requestPathname: string) => {
          const urlStub = createUrlStub(requestPathname);
          await middleware.handle(urlStub);
          expect(loggedInSessionHandlerStub.extendSessionCalled).toBeTruthy();
        };

        for (const path of PROTECTED_ROUTES) {
          await expectToExtendSession(path);
        }
      });
    });
  });
});

const createUrlStub = (pathname: string) => {
  return {
    href: 'http://localhost:3000' + pathname,
    origin: 'http://localhost:3000',
    protocol: 'http:',
    username: '',
    password: '',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    pathname,
    search: '',
    hash: '',
    searchParams: new URLSearchParams(),
    toJSON() {
      return 'http://localhost:3000' + pathname;
    },
  };
};
