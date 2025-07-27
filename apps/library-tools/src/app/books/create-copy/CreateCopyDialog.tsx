import { Dialog } from '@repo/mui/Dialog';
import { AppBar } from '@repo/mui/AppBar';
import { Toolbar } from '@repo/mui/Toolbar';
import { IconButton } from '@repo/mui/IconButton';
import { CloseIcon } from '@repo/mui/icons';
import { Typography } from '@repo/mui/Typography';
import { List } from '@repo/mui/List';
import { BookResponse } from '@repo/book/BookResponse';
import { AddBookForm } from '../add-book-form/AddBookForm.tsx';
import { getInitialValues } from '../book-form/util.ts';

export function CreateCopyDialog({
  open,
  onClose,
  bookToCopy,
  onCopyBookSuccess,
}: {
  open: boolean;
  onClose: () => void;
  bookToCopy: BookResponse | null;
  onCopyBookSuccess: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={onClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Create a Copy
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{ p: 2 }}>
        {bookToCopy && (
          <AddBookForm
            onAddBookSuccess={onCopyBookSuccess}
            defaultValues={getInitialValues(bookToCopy)}
            successMessage={'Successfully created a copy of the book.'}
            errorMessage={'Create copy failed.'}
          />
        )}
      </List>
    </Dialog>
  );
}
