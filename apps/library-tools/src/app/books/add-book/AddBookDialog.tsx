import { Dialog } from '@repo/mui/Dialog';
import { AppBar } from '@repo/mui/AppBar';
import { Toolbar } from '@repo/mui/Toolbar';
import { IconButton } from '@repo/mui/IconButton';
import { CloseIcon } from '@repo/mui/icons';
import { Typography } from '@repo/mui/Typography';
import { AddBookForm } from '../add-book-form/AddBookForm.tsx';
import { List } from '@repo/mui/List';
import { DEFAULT_VALUES } from './defaultValues.ts';

export function AddBookDialog({
  open,
  onClose,
  onAddBookSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onAddBookSuccess: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Add a New Book
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ p: 2 }}>
        <AddBookForm
          onAddBookSuccess={onAddBookSuccess}
          defaultValues={DEFAULT_VALUES}
          successMessage={'Successfully added book.'}
          errorMessage={'Add book failed.'}
        />
      </List>
    </Dialog>
  );
}
