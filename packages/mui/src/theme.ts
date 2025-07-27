import {
  ThemeProvider as MuiThemeProvider,
  createTheme as MuiCreateTheme,
  useTheme as MuiUseTheme,
  SxProps,
} from '@mui/material/styles';
import type { Theme } from '@mui/material';

export const createTheme = MuiCreateTheme;
export const ThemeProvider = MuiThemeProvider;
export const useTheme = MuiUseTheme;
export type { Theme, SxProps };
