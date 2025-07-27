import { useState } from 'react';
import { useGenerateSpineLabels } from './spine-labels/useGenerateSpineLabels.ts';
import { useGenerateBooksCsv } from './books-csv/useGenerateBooksCsv.ts';
import { useDeleteBooks } from './delete-books/useDeleteBooks.ts';
import { useSearchBooks } from './search-books/useSearchBooks.ts';
import { useGenerateBarcodeLabels } from './barcode/useGenerateBarcodeLabels.ts';
import { useEditBookClick } from './edit-book/useEditBookClick.ts';
import { useAddBookClick } from './add-book/useAddBookClick.ts';
import { BookResponse } from '@repo/book/BookResponse';
import { useBooksSelection } from './books-table/useBooksSelection.ts';
import { useCreateCopyClick } from './create-copy/useCreateCopyClick.ts';

export const useBooksPage = ({
  initialTotalCount,
  initialBooks,
}: {
  initialTotalCount: number;
  initialBooks: BookResponse[];
}) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const { isLoading: isLoadingSearchBooks, ...searchBooks } = useSearchBooks({
    initialValues: {
      totalBookCount: initialTotalCount,
      currentPageBooks: initialBooks,
    },
    onSearchClickSuccess: () => {
      resetMessages();
      resetSelectedBooks();
    },
    onSearchSuccess: () => {
      resetSelectedBooks();
    },
    onError: (error: string) => {
      showErrorOnly(error);
    },
  });
  const { handleGenerateSpineLabels, isLoading: isLoadingSpineLabels } = useGenerateSpineLabels({
    onError: (error: string) => {
      showErrorOnly(error);
    },
    onSuccess: (message: string) => {
      showSuccessOnly(message);
    },
  });
  const { handleGenerateBookCsv, isLoading: isLoadingBookCsv } = useGenerateBooksCsv({
    onError: (error: string) => {
      showErrorOnly(error);
    },
    onSuccess: (message: string) => {
      showSuccessOnly(message);
    },
  });
  const { handleGenerateBarcodeLabels, isLoading: isLoadingBarcodeLabels } =
    useGenerateBarcodeLabels({
      onError: (error: string) => {
        showErrorOnly(error);
      },
      onSuccess: (message: string) => {
        showSuccessOnly(message);
      },
    });
  const { isLoading: isLoadingDeleteBooks, ...deleteBooks } = useDeleteBooks({
    onError: (error: string) => {
      showErrorOnly(error);
    },
    onSuccess: (message: string) => {
      showSuccessOnly(message);
      resetSelectedBooks();
      searchBooks.reSearch();
    },
  });
  const { selectedBookIds, handleSelectedBooksChanged, resetSelectedBooks } = useBooksSelection();
  const { loadingBookToEdit, ...editBook } = useEditBookClick({
    onError: (error: string) => {
      showErrorOnly(error);
    },
  });
  const addBook = useAddBookClick();
  const { loadingBookToCopy, ...createCopyClick } = useCreateCopyClick({
    onError: (error: string) => {
      showErrorOnly(error);
    },
  });

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const showSuccessOnly = (successMessage: string) => {
    resetMessages();
    setSuccess(successMessage);
  };

  const showErrorOnly = (errorMessage: string) => {
    resetMessages();
    setError(errorMessage);
  };

  const numberOfSelectedBooks = selectedBookIds.length;
  const showBookSelectionInfoAlert = numberOfSelectedBooks > 0;
  const isLoading =
    isLoadingBookCsv ||
    isLoadingSpineLabels ||
    isLoadingDeleteBooks ||
    isLoadingSearchBooks ||
    isLoadingBarcodeLabels ||
    loadingBookToEdit ||
    loadingBookToCopy;

  return {
    error,
    success,
    isLoading,
    showBookSelectionInfoAlert,
    // selection
    numberOfSelectedBooks,
    selectedBookIds,
    handleSelectedBooksChanged,
    // add book dialog
    addBook,
    // edit book dialog
    editBook,
    // create copy dialog
    createCopyClick,
    // delete books
    deleteBooks,
    // search
    searchBooks,
    // generate
    handleGenerateSpineLabels,
    handleGenerateBookCsv,
    handleGenerateBarcodeLabels,
  };
};
