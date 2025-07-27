import { SessionHandler } from '../SessionHandler.ts';
import { Session } from '../../session.ts';

export class AuthenticatedSessionHandlerSpy implements SessionHandler {
  public extendSessionCalled = false;

  async extendSession(): Promise<void> {
    this.extendSessionCalled = true;
  }
  async getSession(): Promise<Session> {
    return {
      isLoggedIn: true,
    };
  }
}
