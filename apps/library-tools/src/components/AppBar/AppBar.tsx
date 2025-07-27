import { AppBar as MuiAppBar } from '@repo/mui/AppBar';
import { Toolbar } from '@repo/mui/Toolbar';
import { SideMenuButton } from './SideMenuButton.tsx';
import { LogoutButton } from './LogoutButton/LogoutButton.tsx';
import { Box } from '@repo/mui/Box';
import { Title } from './Title.tsx';

export const AppBar = ({ title }: { title: string }) => {
  return (
    <MuiAppBar position='static'>
      <Toolbar variant='dense'>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '40px auto 40px',
            alignItems: 'center',
            gap: 1,
          }}>
          <SideMenuButton />
          <Title title={title} />
          <LogoutButton />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
