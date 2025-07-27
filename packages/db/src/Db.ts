import { Book } from '@repo/entities/Book';

export type Db = {
  getBooks(bookIds: string[]): Promise<Book[]>;
  getBook(id: string): Promise<Book>;
  createBook(book: Book): Promise<void>;
  createBooks(books: Book[]): Promise<void>;
  updateBook(book: Book): Promise<void>;
  deleteAllBooks(): Promise<void>;
  deleteBooks(bookIds: string[]): Promise<void>;
  searchBooks({
    searchTerm,
    page,
    pageSize,
  }: {
    searchTerm: string;
    page: number;
    pageSize: number;
  }): Promise<{ totalBookCount: number; currentPageBooks: Book[] }>;
  barcodeExists(barcode: string): Promise<boolean>;
  getLastBookWithBarcodeStartChar(barcodeStartCharacter: string): Promise<Book | null>;
};
