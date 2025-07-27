import { useState } from 'react';
import { TextField } from '@repo/mui/TextField';
import { Container } from '@repo/mui/Container';
import { Stack } from '@repo/mui/Stack';
import { Alert } from '@repo/mui/Alert';
import { loginAction } from './loginAction.ts';
import { useRouter } from 'next/navigation';
import { Pages } from '../../pages.ts';
import { LoadingButton } from '@repo/mui/LoadingButton';
import { Notification } from './interactor/LoginInteractor.ts';

const NOTIFICATION_TO_MESSAGE_MAP: Record<Notification, string> = {
  INCORRECT_PASSWORD: 'Incorrect password',
};

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginClick = async () => {
    try {
      setIsLoading(true);
      const res = await loginAction(password);
      if (res.notification) {
        handleNotification(res.notification);
        return;
      }
      handleSuccess();
    } catch (e) {
      handleError();
    }
  };

  const handleNotification = (notification: Notification) => {
    setError(NOTIFICATION_TO_MESSAGE_MAP[notification]);
    setIsLoading(false);
  };

  const handleSuccess = () => {
    setError('');
    router.push(Pages.BOOKS);
  };

  const handleError = () => {
    setError('Login failed.');
    setIsLoading(false);
  };

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={1}>
          <h1>1000 Buddha Library Tools</h1>
          <TextField
            type={'password'}
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton loading={isLoading} onClick={handleLoginClick}>
            login
          </LoadingButton>
          {error && <Alert severity='error'>{error}</Alert>}
        </Stack>
      </Container>
    </>
  );
};
