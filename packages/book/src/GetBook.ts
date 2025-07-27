import { Db } from '@repo/db/Db';
import { BookResponse } from './BookResponse';
import { ResponseConverter } from './ResponseConverter';

export type GetBookRequest = {
  bookId: string;
};

export type GetBookResponse = {
  book: BookResponse;
};

export class GetBook {
  constructor(
    private db: Db,
    private responseConverter: ResponseConverter,
  ) {}

  async execute(request: GetBookRequest): Promise<GetBookResponse> {
    const book = await this.db.getBook(request.bookId);
    const booksResponse = this.responseConverter.convertBookToBookResponse(book);
    return { book: booksResponse };
  }
}
