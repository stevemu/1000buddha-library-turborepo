import { TableBody, TableCell, TableRow } from '@repo/mui/Table';
import { Checkbox } from '@repo/mui/Checkbox';
import { MouseEvent } from 'react';
import { BookResponse } from '@repo/book/BookResponse';
import { ActionsMenu } from '../../../components/ActionsMenu/ActionsMenu.tsx';

export function BooksTableBody({
  books,
  selected,
  onCheckboxClick,
  onEditClick,
  onCreateCopyClick,
}: {
  books: BookResponse[];
  selected: string[];
  onCheckboxClick: (event: MouseEvent<unknown>, id: string, index: number) => void;
  onEditClick: (id: string) => void;
  onCreateCopyClick: (id: string) => void;
}) {
  return (
    <TableBody>
      {books.map((book, index) => {
        return (
          <BookTableRow
            key={book.id}
            book={book}
            selected={selected}
            handleClick={onCheckboxClick}
            index={index}
            onEditClick={onEditClick}
            onCreateCopyClick={onCreateCopyClick}
          />
        );
      })}
    </TableBody>
  );
}

function BookTableRow({
  book,
  selected,
  handleClick,
  index,
  onEditClick,
  onCreateCopyClick,
}: {
  book: BookResponse;
  selected: string[];
  handleClick: (event: MouseEvent<unknown>, id: string, index: number) => void;
  index: number;
  onEditClick: (id: string) => void;
  onCreateCopyClick: (id: string) => void;
}) {
  const isItemSelected = selected.includes(book.id);

  return (
    <TableRow hover tabIndex={-1} key={book.id} selected={isItemSelected}>
      <TableCell padding='checkbox' onClick={(event) => handleClick(event, book.id, index)}>
        <Checkbox color='primary' checked={isItemSelected} />
      </TableCell>
      <TableCell align='right'>
        <ActionsMenu
          isLoading={false}
          actions={[
            {
              title: 'Edit',
              onClick: () => onEditClick(book.id),
            },
            {
              title: 'Create a copy',
              onClick: () => onCreateCopyClick(book.id),
            },
          ]}
        />
      </TableCell>
      <TableCell align='right'>{book.barcode}</TableCell>
      <TableCell align='left'>{book.title}</TableCell>
      <TableCell align='left'>{book.author}</TableCell>
      <TableCell align='right'>{book.category}</TableCell>
      <TableCell align='right'>{book.classificationNumber}</TableCell>
      <TableCell align='right'>{book.authorNumber}</TableCell>
      <TableCell align='right'>{book.yearPublished}</TableCell>
      <TableCell align='right'>{book.placeOfPublication}</TableCell>
      <TableCell align='right'>{book.publisher}</TableCell>
      <TableCell align='right'>{book.copyNumber}</TableCell>
    </TableRow>
  );
}
