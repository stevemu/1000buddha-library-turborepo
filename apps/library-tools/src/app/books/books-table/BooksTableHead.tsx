import { TableCell, TableHead, TableRow } from '@repo/mui/Table';

export function BooksTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell align='right'>Barcode 条形码</TableCell>
        <TableCell align='left'>Title 書題</TableCell>
        <TableCell align='left'>Author 作者</TableCell>
        <TableCell align='right'>Category 類別</TableCell>
        <TableCell align='right'>Classification Number 分類號</TableCell>
        <TableCell align='right'>Author Number 作者號</TableCell>
        <TableCell align='right'>Year Published 出版年</TableCell>
        <TableCell align='right'>Place of Publication 出版地</TableCell>
        <TableCell align='right'>Publisher 出版社</TableCell>
        <TableCell align='right'>Copy Number 冊次複本</TableCell>
      </TableRow>
    </TableHead>
  );
}
