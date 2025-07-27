import { SessionHandler } from '../SessionHandler.ts';
import { Session } from '../../session.ts';

export class UnauthenticatedSessionHandlerStub implements SessionHandler {
  async extendSession(): Promise<void> {}
  async getSession(): Promise<Session> {
    return {
      isLoggedIn: false,
    };
  }
}
