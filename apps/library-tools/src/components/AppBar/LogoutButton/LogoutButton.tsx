import { IconButton } from '@repo/mui/IconButton';
import { LogoutIcon } from '@repo/mui/icons';
import { logoutAction } from './logoutAction.ts';
import { useRouter } from 'next/navigation';
import { Pages } from '../../../pages.ts';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push(Pages.LOGIN);
  };

  return (
    <IconButton color='inherit' onClick={handleLogout}>
      <LogoutIcon />
    </IconButton>
  );
};
