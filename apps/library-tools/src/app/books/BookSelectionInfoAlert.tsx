import { Stack } from '@repo/mui/Stack';
import { Alert } from '@repo/mui/Alert';

const CANNOT_GENERATE_DUE_TO_SELECTING_MORE_THAN_30_BOOKS_MESSAGE =
  'Cannot generate spine labels or barcode due to selecting more than 30 books. To generate spine labels or barcode, please select up to 30 books.';

export const BookSelectionInfoAlert = ({
  numberOfSelectedBooks,
}: {
  numberOfSelectedBooks: number;
}) => {
  return (
    <Alert severity='info'>
      <Stack>
        <span>{createNumberOfSelectedBooksMessage(numberOfSelectedBooks)}</span>
        {numberOfSelectedBooks > 30 && (
          <span>{CANNOT_GENERATE_DUE_TO_SELECTING_MORE_THAN_30_BOOKS_MESSAGE}</span>
        )}
      </Stack>
    </Alert>
  );
};

function createNumberOfSelectedBooksMessage(numberOfSelectedBooks: number) {
  if (numberOfSelectedBooks === 1) {
    return '1 book selected';
  }
  return `${numberOfSelectedBooks} books selected`;
}
