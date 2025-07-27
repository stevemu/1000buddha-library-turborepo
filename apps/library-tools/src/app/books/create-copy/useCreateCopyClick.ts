import { useState } from 'react';
import { BookResponse } from '@repo/book/BookResponse';
import { getBookAction } from '../edit-book/form/getBookAction.ts';
import { logError } from '@repo/client-logger/log';

export const useCreateCopyClick = ({ onError }: { onError: (error: string) => void }) => {
  const [bookToCopy, setBookToCopy] = useState<BookResponse | null>(null);
  const [loadingBookToCopy, setLoadingBookToCopy] = useState(false);
  const [openCopyBookDialog, setOpenCopyBookDialog] = useState(false);

  const handleCopyBookClick = async (bookId: string) => {
    try {
      setLoadingBookToCopy(true);
      const { book } = await getBookAction({ bookId });
      handleSuccess(book);
    } catch (e) {
      logError({ message: 'Copy book action failed', error: e as Error });
      handleError();
    }
  };

  const handleSuccess = (book: BookResponse) => {
    setLoadingBookToCopy(false);
    setBookToCopy(book);
    setOpenCopyBookDialog(true);
  };

  const handleError = () => {
    onError('Copy book action failed.');
    setLoadingBookToCopy(false);
  };

  const handleCloseCopyBookDialog = () => {
    setOpenCopyBookDialog(false);
  };

  return {
    bookToCopy,
    loadingBookToCopy,
    handleCopyBookClick,
    openCopyBookDialog,
    handleCloseCopyBookDialog,
  };
};
