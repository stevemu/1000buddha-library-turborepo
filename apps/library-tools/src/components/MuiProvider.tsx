'use client';
/** createTheme only works on the client side **/

import { createTheme, ThemeProvider } from '@repo/mui/theme';
import { AppRouterCacheProvider } from '@repo/mui/AppRouterCacheProvider';
import {} from '@repo/mui/labThemeAugmentation';
import { ReactNode } from 'react';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export const MuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={lightTheme}>
        <>{children}</>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
