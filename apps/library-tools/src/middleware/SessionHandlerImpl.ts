import { extendSession, getSession } from '../session.ts';
import { SessionHandler } from './SessionHandler.ts';

export class SessionHandlerImpl implements SessionHandler {
  async getSession() {
    return getSession();
  }
  async extendSession() {
    return extendSession();
  }
}
