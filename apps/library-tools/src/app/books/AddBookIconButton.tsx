import { IconButton } from '@repo/mui/IconButton';
import { AddIcon } from '@repo/mui/icons';

export function AddBookIconButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}
