import MuiBox, { BoxProps } from '@mui/material/Box';

type Props = BoxProps;

export const Box = ({ children, ...props }: Props) => {
  return <MuiBox {...props}>{children}</MuiBox>;
};
