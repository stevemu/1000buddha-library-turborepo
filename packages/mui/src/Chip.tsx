import MuiChip, { ChipProps } from '@mui/material/Chip';

type Props = ChipProps;

export const Chip = ({ children, ...props }: Props) => {
  return <MuiChip {...props}>{children}</MuiChip>;
};
