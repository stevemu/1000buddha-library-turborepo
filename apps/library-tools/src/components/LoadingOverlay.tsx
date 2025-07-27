import { Backdrop } from '@repo/mui/Backdrop';
import { CircularProgress } from '@repo/mui/CircularProgress';

export const LoadingOverlay = ({ visible }: { visible: boolean }) => {
  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={visible}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
