import { useState } from 'react';
import { BookResponse } from '@repo/book/BookResponse';
import { getBookAction } from './form/getBookAction.ts';
import { logError } from '@repo/client-logger/log';

export const useEditBookClick = ({ onError }: { onError: (error: string) => void }) => {
  const [bookToEdit, setBookToEdit] = useState<BookResponse | null>(null);
  const [loadingBookToEdit, setLoadingBookToEdit] = useState(false);
  const [openEditBookDialog, setOpenEditBookDialog] = useState(false);

  const handleEditBookClick = async (bookId: string) => {
    try {
      setLoadingBookToEdit(true);
      const { book } = await getBookAction({ bookId });
      handleSuccess(book);
    } catch (e) {
      logError({ message: 'edit book action failed', error: e as Error });
      handleError();
    }
  };

  const handleSuccess = (book: BookResponse) => {
    setLoadingBookToEdit(false);
    setBookToEdit(book);
    setOpenEditBookDialog(true);
  };

  const handleError = () => {
    onError('Edit book action failed.');
    setLoadingBookToEdit(false);
  };

  const handleCloseEditBookDialog = () => {
    setOpenEditBookDialog(false);
  };

  return {
    bookToEdit,
    loadingBookToEdit,
    handleEditBookClick,
    openEditBookDialog,
    handleCloseEditBookDialog,
  };
};
