import { Db } from '@repo/db/Db';
import { CsvGenerator } from './CsvGenerator';
import { Book } from '@repo/entities/Book';

export class GenerateBooksCsv {
  constructor(
    private db: Db,
    private csvGenerator: CsvGenerator,
  ) {}

  async execute(bookIds: string[]) {
    const books: Book[] = await this.db.getBooks(bookIds);
    const rows = await this.convertBooksToRows(books);
    const csvString = await this.csvGenerator.generate(this.header, rows);
    return csvString;
  }

  private readonly header = [
    '項目類別',
    '條碼',
    '書題',
    '分類號',
    '著者',
    '出版地',
    '出版社',
    '冊次複本',
  ];

  async convertBooksToRows(books: Book[]): Promise<string[][]> {
    const rows = [];
    for (const book of books) {
      rows.push([
        // Add "single quote" is to prevent the Excel from removing the leading zeros
        // when opened in Zhikai's Windows PC.
        `'${book.category}`,
        book.barcode,
        book.title,
        `'${book.classificationNumber}`,
        book.author,
        book.placeOfPublication,
        book.publisher,
        book.copyNumber,
      ]);
    }
    return rows;
  }
}
