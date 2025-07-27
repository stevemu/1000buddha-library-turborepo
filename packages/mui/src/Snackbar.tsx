import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar';

type Props = SnackbarProps;

export const Snackbar = ({ children, ...props }: Props) => {
  return <MuiSnackbar {...props}>{children}</MuiSnackbar>;
};
