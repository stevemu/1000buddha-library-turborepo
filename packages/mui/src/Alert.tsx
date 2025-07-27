import MuiAlert, { AlertProps } from '@mui/material/Alert';

type Props = AlertProps;

export const Alert = ({ children, ...props }: Props) => {
  return <MuiAlert {...props}>{children}</MuiAlert>;
};
