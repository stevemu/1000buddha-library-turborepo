import { Db } from '@repo/db/Db';
import { Book } from '@repo/entities/Book';
import { Pool } from 'pg';
import { ISOToDateConverter } from '@repo/date-converter/ISOToDateConverter';

type BookRow = {
  id: string;
  barcode: string;
  title: string;
  category: string;
  classification_number: string;
  author_number: string;
  year_published: string;
  copy_number: string;
  place_of_publication: string;
  publisher: string;
  author: string;
  date_added: string;
};

export class DbImpl implements Db {
  private pool!: Pool;

  constructor(
    private connectionString: string,
    private isoToDateConverter: ISOToDateConverter,
  ) {
    this.pool = new Pool({
      connectionString: this.connectionString,
    });
  }

  async disconnect() {
    await this.pool.end();
  }

  async initBookTable() {
    await this.pool.query(
      'CREATE TABLE "Book" (\n' +
        '    title text NOT NULL,\n' +
        '    author_number text,\n' +
        '    year_published text,\n' +
        '    id text PRIMARY KEY,\n' +
        '    barcode text NOT NULL UNIQUE,\n' +
        '    category text,\n' +
        '    classification_number text,\n' +
        '    copy_number text,\n' +
        '    author text,\n' +
        '    place_of_publication text,\n' +
        '    publisher text,\n' +
        '    date_added text NOT NULL\n' +
        ')',
    );
  }

  async barcodeExists(barcode: string) {
    const result = await this.pool.query<BookRow>(
      'SELECT * FROM "public"."Book" WHERE "barcode" = $1',
      [barcode],
    );
    return result.rows.length > 0;
  }

  async getBook(id: string) {
    const result = await this.pool.query<BookRow>('SELECT * FROM "public"."Book" WHERE "id" = $1', [
      id,
    ]);
    return this.convertBookRowToBook(result.rows[0]!);
  }

  async getBooks(bookIds: string[]) {
    const result = await this.pool.query<BookRow>(
      'SELECT * FROM "public"."Book" WHERE "id" = ANY($1) ORDER BY date_added ASC',
      [bookIds],
    );
    return result.rows.map((row) => this.convertBookRowToBook(row));
  }

  async createBook(book: Book) {
    await this.insertBook(book);
  }

  async createBooks(books: Book[]) {
    for (const book of books) {
      await this.insertBook(book);
    }
  }

  private async insertBook(book: Book) {
    await this.pool.query(
      'INSERT INTO "public"."Book"' +
        '(id, barcode, title, category, classification_number, author_number, author, ' +
        'year_published, place_of_publication, publisher, copy_number, date_added) ' +
        'VALUES ' +
        '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [
        book.id,
        book.barcode,
        book.title,
        book.category,
        book.classificationNumber,
        book.authorNumber,
        book.author,
        book.yearPublished,
        book.placeOfPublication,
        book.publisher,
        book.copyNumber,
        book.dateAdded,
      ],
    );
  }

  async updateBook(book: Book) {
    await this.pool.query(
      'UPDATE "public"."Book" ' +
        'SET "barcode" = $1, "title" = $2, "category" = $3, "classification_number" = $4, ' +
        '"author_number" = $5, "year_published" = $6, "copy_number" = $7, "author" = $8, ' +
        '"place_of_publication" = $9, "publisher" = $10 WHERE "id" = $11',
      [
        book.barcode,
        book.title,
        book.category,
        book.classificationNumber,
        book.authorNumber,
        book.yearPublished,
        book.copyNumber,
        book.author,
        book.placeOfPublication,
        book.publisher,
        book.id,
      ],
    );
  }

  async deleteBooks(bookIds: string[]) {
    await this.pool.query('DELETE FROM "public"."Book" WHERE "id" = ANY($1)', [bookIds]);
  }

  async deleteAllBooks(): Promise<void> {
    await this.pool.query('DELETE FROM "public"."Book"');
  }

  async searchBooks({
    searchTerm,
    page,
    pageSize,
  }: {
    searchTerm: string;
    page: number;
    pageSize: number;
  }): Promise<{ totalBookCount: number; currentPageBooks: Book[] }> {
    const whereClause = `
        "barcode" ILIKE $1 
        OR "title" ILIKE $1 
        OR "category" ILIKE $1
        OR "classification_number" ILIKE $1 
        OR "author_number" ILIKE $1
        OR "year_published" ILIKE $1
        OR "copy_number" ILIKE $1
        OR "place_of_publication" ILIKE $1 
        OR "publisher" ILIKE $1 
        OR "author" ILIKE $1
      `;
    const currentPageResult = await this.pool.query<BookRow>(
      `SELECT * FROM "public"."Book" 
        WHERE ${whereClause}
        ORDER BY "date_added" DESC LIMIT $2 OFFSET $3`,
      [`%${searchTerm}%`, pageSize, page * pageSize],
    );
    const countResult = await this.pool.query<{ count: number }>(
      `SELECT COUNT(*) FROM "public"."Book" 
        WHERE ${whereClause}`,
      [`%${searchTerm}%`],
    );
    return {
      totalBookCount: countResult.rows[0]!.count,
      currentPageBooks: currentPageResult.rows.map((row) => this.convertBookRowToBook(row)),
    };
  }

  convertBookRowToBook(row: BookRow) {
    return new Book(
      row.id,
      row.barcode,
      row.title,
      row.category,
      row.classification_number,
      row.author_number,
      row.author,
      row.year_published,
      row.place_of_publication,
      row.publisher,
      row.copy_number,
      this.isoToDateConverter.convert(row.date_added),
    );
  }

  async getLastBookWithBarcodeStartChar(barcodeStartCharacter: string): Promise<Book | null> {
    const result = await this.pool.query<BookRow>(
      `SELECT * FROM "public"."Book" 
        WHERE "barcode" ILIKE $1 
        ORDER BY "barcode" DESC LIMIT 1`,
      [`${barcodeStartCharacter}%`],
    );
    if (result.rows.length === 0) {
      return null;
    }
    return this.convertBookRowToBook(result.rows[0]!);
  }
}
