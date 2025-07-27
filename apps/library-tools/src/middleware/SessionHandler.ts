import { Session } from '../session.ts';

export interface SessionHandler {
  getSession(): Promise<Session>;
  extendSession(): Promise<void>;
}
