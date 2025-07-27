import { describe, it, expect, beforeEach } from '@jest/globals';
import { CookieGenerator, LoginInteractor } from '../LoginInteractor.ts';

export class CookieGeneratorSpy implements CookieGenerator {
  public generateCalled = false;

  async generate() {
    this.generateCalled = true;
  }
}

describe('LoginInteractor', () => {
  let interactor: LoginInteractor;
  let cookieGenerator: CookieGeneratorSpy;

  beforeEach(() => {
    interactor = new LoginInteractor();
    cookieGenerator = new CookieGeneratorSpy();
    interactor.setCookieGenerator(cookieGenerator);
  });

  it('when password is correct, should not return notification, should generate cookie', async () => {
    interactor.setPassword('123');

    const res = await interactor.login('123');
    expect(res.notification).toBeUndefined();
    expect(cookieGenerator.generateCalled).toBeTruthy();
  });

  it('when password is incorrect, should return notification, should not generate cookie', async () => {
    interactor.setPassword('1');

    const res = await interactor.login('2');
    expect(res).toEqual({
      notification: 'INCORRECT_PASSWORD',
    });
    expect(cookieGenerator.generateCalled).toBeFalsy();
  });
});
