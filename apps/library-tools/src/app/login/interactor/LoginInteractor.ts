export interface CookieGenerator {
  generate(): Promise<void>;
}

export type Notification = 'INCORRECT_PASSWORD';

export interface LoginResponse {
  notification: Notification | null;
}

export class LoginInteractor {
  private cookieGenerator!: CookieGenerator;
  private password!: string;

  setCookieGenerator(cookieGenerator: CookieGenerator) {
    this.cookieGenerator = cookieGenerator;
  }

  setPassword(password: string) {
    this.password = password;
  }

  async login(password: string): Promise<LoginResponse> {
    if (password !== this.password) {
      return {
        notification: 'INCORRECT_PASSWORD',
      };
    }

    await this.cookieGenerator.generate();
    return {
      notification: null,
    };
  }
}
