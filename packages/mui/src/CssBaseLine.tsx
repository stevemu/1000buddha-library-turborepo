import MuiCssBaseline, { CssBaselineProps } from '@mui/material/CssBaseline';

type Props = CssBaselineProps;

export const CssBaseline = ({ children, ...props }: Props) => {
  return <MuiCssBaseline {...props}>{children}</MuiCssBaseline>;
};
