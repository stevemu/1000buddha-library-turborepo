import { Db } from '@repo/db/Db';
import { Book } from '@repo/entities/Book';

export class DbStub implements Db {
  barcodeExists(barcode: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  createBook(book: Book): Promise<void> {
    return Promise.resolve(undefined);
  }

  createBooks(books: Book[]): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteAllBooks(): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteBooks(bookIds: string[]): Promise<void> {
    return Promise.resolve(undefined);
  }

  getBook(id: string): Promise<Book> {
    return Promise.resolve(undefined as any);
  }

  getBooks(bookIds: string[]): Promise<Book[]> {
    return Promise.resolve([]);
  }

  searchBooks({
    searchTerm,
    page,
    pageSize,
  }: {
    searchTerm: string;
    page: number;
    pageSize: number;
  }): Promise<{
    totalBookCount: number;
    currentPageBooks: Book[];
  }> {
    return Promise.resolve({ currentPageBooks: [], totalBookCount: 0 });
  }

  updateBook(book: Book): Promise<void> {
    return Promise.resolve(undefined);
  }

  async getLastBookWithBarcodeStartChar(barcodeStartCharacter: string): Promise<Book | null> {
    return null;
  }
}
