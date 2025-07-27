import { Paper } from '@repo/mui/Paper';
import { Table, TableContainer } from '@repo/mui/Table';
import { Box } from '@repo/mui/Box';
import { BookResponse } from '@repo/book/BookResponse';
import { BooksTableHead } from './BooksTableHead.tsx';
import { BooksTableBody } from './BooksTableBody.tsx';
import { useCheckboxClick } from './useCheckboxClick.ts';
import { Pagination } from './Pagination.tsx';

export function BooksTable({
  currentPageBooks,
  onSelectedChange,
  selected,
  onEditClick,
  onCreateCopyClick,
  onPageChange,
  onRowsPerPageChange,
  page,
  pageSize,
  totalBookCount,
}: {
  currentPageBooks: BookResponse[];
  onSelectedChange: (ids: string[]) => void;
  selected: string[];
  onEditClick: (id: string) => void;
  onCreateCopyClick: (id: string) => void;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPageSize: number) => void;
  page: number;
  pageSize: number;
  totalBookCount: number;
}) {
  const { handleCheckboxClick } = useCheckboxClick({
    books: currentPageBooks,
    selected,
    onSelectedChange,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={2}>
        <Pagination
          totalBookCount={totalBookCount}
          page={page}
          onPageChange={(newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(page) => onRowsPerPageChange(page)}
          pageSize={pageSize}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <BooksTableHead />
            <BooksTableBody
              books={currentPageBooks}
              selected={selected}
              onCheckboxClick={handleCheckboxClick}
              onEditClick={onEditClick}
              onCreateCopyClick={onCreateCopyClick}
            />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
