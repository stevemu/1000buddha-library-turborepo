import { destroySession } from '../../../session.ts';

export const logoutAction = async () => {
  await destroySession();
};
