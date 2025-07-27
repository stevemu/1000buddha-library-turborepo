import { ResponseConverter } from './ResponseConverter';
import { Book } from '@repo/entities/Book';
import { BookResponse } from './BookResponse';

export class ResponseConverterImpl implements ResponseConverter {
  convertBookToBookResponse(book: Book): BookResponse {
    return {
      id: book.id,
      barcode: book.barcode,
      title: book.title,
      category: book.category,
      classificationNumber: book.classificationNumber,
      authorNumber: book.authorNumber,
      yearPublished: book.yearPublished,
      copyNumber: book.copyNumber,
      author: book.author,
      placeOfPublication: book.placeOfPublication,
      publisher: book.publisher,
      dateAdded: book.dateAdded.toISOString(),
    };
  }

  convertBooksToBookResponses(books: Book[]): BookResponse[] {
    return books.map((book) => this.convertBookToBookResponse(book));
  }
}
