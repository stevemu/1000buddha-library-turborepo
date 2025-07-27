'use server';

import { saveAuthenticatedSession } from '../../session.ts';
import { CookieGenerator, LoginInteractor } from './interactor/LoginInteractor.ts';
import { getLoginPassword } from '../../utils/env.ts';

class CookieGeneratorImpl implements CookieGenerator {
  async generate() {
    await saveAuthenticatedSession();
  }
}

export const loginAction = async (password: string) => {
  const loginInteractor = new LoginInteractor();
  loginInteractor.setCookieGenerator(new CookieGeneratorImpl());
  const loginPassword = getLoginPassword();
  loginInteractor.setPassword(loginPassword);
  return loginInteractor.login(password);
};
