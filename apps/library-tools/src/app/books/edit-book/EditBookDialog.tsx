import { Dialog } from '@repo/mui/Dialog';
import { AppBar } from '@repo/mui/AppBar';
import { Toolbar } from '@repo/mui/Toolbar';
import { IconButton } from '@repo/mui/IconButton';
import { CloseIcon } from '@repo/mui/icons';
import { Typography } from '@repo/mui/Typography';
import { EditBookForm } from './form/EditBookForm.tsx';
import { List } from '@repo/mui/List';
import { BookResponse } from '@repo/book/BookResponse';

export function EditBookDialog({
  open,
  onClose,
  bookToEdit,
  onEditBookSuccess,
}: {
  open: boolean;
  onClose: () => void;
  bookToEdit: BookResponse;
  onEditBookSuccess: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Edit Book
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ p: 2 }}>
        <EditBookForm bookToEdit={bookToEdit} onEditBookSuccess={onEditBookSuccess} />
      </List>
    </Dialog>
  );
}
