import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';

type Props = CheckboxProps;

export const Checkbox = ({ ...props }: Props) => {
  return <MuiCheckbox {...props} />;
};
