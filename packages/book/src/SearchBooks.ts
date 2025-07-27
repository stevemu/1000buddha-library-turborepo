import { Db } from '@repo/db/Db';
import { BookResponse } from './BookResponse';
import { ResponseConverter } from './ResponseConverter';

export type SearchBooksRequest = {
  searchTerm: string;
  page: number;
  pageSize: number;
};

export type SearchBooksResponse = {
  totalBookCount: number;
  currentPageBooks: BookResponse[];
};

export class SearchBooks {
  constructor(
    private db: Db,
    private responseConverter: ResponseConverter,
  ) {}

  async execute(request: SearchBooksRequest): Promise<SearchBooksResponse> {
    const { totalBookCount, currentPageBooks } = await this.db.searchBooks({
      searchTerm: request.searchTerm,
      page: request.page,
      pageSize: request.pageSize,
    });
    const booksResponse = this.responseConverter.convertBooksToBookResponses(currentPageBooks);
    return { currentPageBooks: booksResponse, totalBookCount };
  }
}
