import { Book } from '@repo/entities/Book';
import { BookResponse } from './BookResponse';

export interface ResponseConverter {
  convertBookToBookResponse(book: Book): BookResponse;
  convertBooksToBookResponses(books: Book[]): BookResponse[];
}
