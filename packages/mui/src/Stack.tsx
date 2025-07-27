import MuiStack, { StackProps } from '@mui/material/Stack';

type Props = StackProps;

export const Stack = ({ children, ...props }: Props) => {
  return <MuiStack {...props}>{children}</MuiStack>;
};
