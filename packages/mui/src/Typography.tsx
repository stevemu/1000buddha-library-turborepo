import MuiTypography, { TypographyProps } from '@mui/material/Typography';

type Props = TypographyProps;

export const Typography = ({ children, ...props }: Props) => {
  return <MuiTypography {...props}>{children}</MuiTypography>;
};
