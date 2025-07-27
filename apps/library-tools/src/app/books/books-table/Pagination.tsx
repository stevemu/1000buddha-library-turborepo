import { TablePagination } from '@repo/mui/Table';

export function Pagination({
  onPageChange,
  onRowsPerPageChange,
  page,
  pageSize,
  totalBookCount,
}: {
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPageSize: number) => void;
  page: number;
  pageSize: number;
  totalBookCount: number;
}) {
  return (
    <TablePagination
      sx={{
        '& .MuiTablePagination-spacer': {
          display: 'none',
        },
      }}
      rowsPerPageOptions={[10, 30, 50, 100, 500, 1000]}
      component='div'
      count={totalBookCount}
      rowsPerPage={pageSize}
      page={page}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
      labelDisplayedRows={({ from, to, count, page }) =>
        `Page: ${page + 1} | ${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
      }
    />
  );
}
