'use client';

import { Stack } from '@repo/mui/Stack';
import { Button } from '@repo/mui/Button';
import { LoadingOverlay } from '../../components/LoadingOverlay.tsx';
import { Alert } from '@repo/mui/Alert';
import { BookSelectionInfoAlert } from './BookSelectionInfoAlert.tsx';
import { getShouldDisableGenerateSpineLabelsButton } from './spine-labels/buttonUtil.ts';
import { getShouldDisableGenerateBookCsvButton } from './books-csv/buttonUtil.ts';
import { AddBookDialog } from './add-book/AddBookDialog.tsx';
import { AddBookIconButton } from './AddBookIconButton.tsx';
import { getShouldDisableDeleteBooksButton } from './delete-books/buttonUtil.ts';
import { BooksTable } from './books-table/BooksTable.tsx';
import { EditBookDialog } from './edit-book/EditBookDialog.tsx';
import { BookResponse } from '@repo/book/BookResponse';
import { Search } from './search-books/Search.tsx';
import { useBooksPage } from './useBooksPage.ts';
import { getShouldDisableGenerateBarcodeLabelsButton } from './barcode/buttonUtil.ts';
import { CreateCopyDialog } from './create-copy/CreateCopyDialog.tsx';
import { AppBar } from '../../components/AppBar/AppBar.tsx';
import { Box } from '@repo/mui/Box';

export function BooksPage({
  initialBooks,
  initialTotalCount,
}: {
  initialBooks: BookResponse[];
  initialTotalCount: number;
}) {
  const {
    selectedBookIds,
    handleSelectedBooksChanged,
    error,
    success,
    addBook,
    editBook,
    handleGenerateSpineLabels,
    handleGenerateBookCsv,
    deleteBooks,
    numberOfSelectedBooks,
    showBookSelectionInfoAlert,
    isLoading,
    handleGenerateBarcodeLabels,
    searchBooks,
    createCopyClick,
  } = useBooksPage({
    initialTotalCount,
    initialBooks,
  });

  return (
    <>
      <AppBar title={'Books'} />
      <Box sx={{ p: 2 }}>
        <LoadingOverlay visible={isLoading} />
        <AddBookDialog
          open={addBook.openAddBookDialog}
          onClose={() => addBook.handleCloseAddBookDialog()}
          onAddBookSuccess={searchBooks.reSearch}
        />
        <EditBookDialog
          open={editBook.openEditBookDialog}
          onClose={() => editBook.handleCloseEditBookDialog()}
          bookToEdit={editBook.bookToEdit!}
          onEditBookSuccess={searchBooks.reSearch}
        />
        <CreateCopyDialog
          open={createCopyClick.openCopyBookDialog}
          onClose={() => createCopyClick.handleCloseCopyBookDialog()}
          bookToCopy={createCopyClick.bookToCopy}
          onCopyBookSuccess={searchBooks.reSearch}
        />
        <Stack spacing={1}>
          <Search
            searchTerm={searchBooks.searchTerm}
            handleSearchTermChange={searchBooks.handleSearchTermChange}
            handleSearchBooksClick={searchBooks.handleSearchClick}
            handleClearClick={searchBooks.handleClearClick}
          />
          <Stack direction={'row'} spacing={1} flexWrap={'wrap'} rowGap={1}>
            <AddBookIconButton onClick={() => addBook.handleOpenAddBookDialog()} />
            <Button
              onClick={() => handleGenerateBarcodeLabels(selectedBookIds)}
              disabled={getShouldDisableGenerateBarcodeLabelsButton(numberOfSelectedBooks)}>
              Generate Barcode Labels
            </Button>
            <Button
              onClick={() => handleGenerateSpineLabels(selectedBookIds)}
              disabled={getShouldDisableGenerateSpineLabelsButton(numberOfSelectedBooks)}>
              Generate Spine Labels
            </Button>
            <Button
              onClick={() => handleGenerateBookCsv(selectedBookIds)}
              disabled={getShouldDisableGenerateBookCsvButton(numberOfSelectedBooks)}>
              Generate Books CSV
            </Button>
            <Button
              onClick={() => deleteBooks.handleDeleteBooks(selectedBookIds)}
              disabled={getShouldDisableDeleteBooksButton(numberOfSelectedBooks)}>
              Delete Books
            </Button>
          </Stack>
          {showBookSelectionInfoAlert && (
            <BookSelectionInfoAlert numberOfSelectedBooks={numberOfSelectedBooks} />
          )}
          {error && <Alert severity='error'>{error}</Alert>}
          {success && <Alert severity='success'>{success}</Alert>}
          <BooksTable
            currentPageBooks={searchBooks.currentPageBooks}
            onSelectedChange={(ids) => handleSelectedBooksChanged(ids)}
            selected={selectedBookIds}
            onEditClick={(id) => editBook.handleEditBookClick(id)}
            onCreateCopyClick={(id) => createCopyClick.handleCopyBookClick(id)}
            onPageChange={searchBooks.handleChangePageClick}
            onRowsPerPageChange={searchBooks.handleChangeRowsPerPageClick}
            page={searchBooks.page}
            pageSize={searchBooks.pageSize}
            totalBookCount={searchBooks.totalBookCount}
          />
        </Stack>
      </Box>
    </>
  );
}
