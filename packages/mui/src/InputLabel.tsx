import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';

type Props = InputLabelProps;

export const InputLabel = ({ children, ...props }: Props) => {
  return <MuiInputLabel {...props}>{children}</MuiInputLabel>;
};
