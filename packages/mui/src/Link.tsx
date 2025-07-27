import MuiLink, { LinkProps } from '@mui/material/Link';

type Props = LinkProps;

export const Link = ({ children, ...props }: Props) => {
  return <MuiLink {...props}>{children}</MuiLink>;
};
