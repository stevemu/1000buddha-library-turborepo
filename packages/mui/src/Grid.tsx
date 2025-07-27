import MuiGrid, { GridProps } from '@mui/material/Grid';

type Props = GridProps;

export const Grid = ({ children, ...props }: Props) => {
  return <MuiGrid {...props}>{children}</MuiGrid>;
};
