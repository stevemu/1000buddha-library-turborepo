import { Db } from '@repo/db/Db';
import { Book } from '@repo/entities/Book';
import { UUIDGenerator } from '@repo/uuid/UUIDGenerator';

export interface CsvReader {
  readCsv(filePath: string): Promise<string[][]>;
}

export interface Logger {
  logBook(book: Book): void;
}

export class Seed {
  constructor(
    private db: Db,
    private csvReader: CsvReader,
    private uuidGenerator: UUIDGenerator,
    private logger: Logger,
  ) {}

  public async execute() {
    const existingBookCsv = await this.csvReader.readCsv('./csv-files/books.csv');
    const bodyRows = existingBookCsv.slice(1);
    for (const row of bodyRows) {
      await this.seedRow(row);
    }
  }

  private async seedRow(row: string[]) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    const book = new Book(
      this.uuidGenerator.generate(),
      row[3] as string,
      row[5] as string,
      row[0] as string,
      row[6] as string,
      row[7] as string,
      row[4] as string,
      row[10] as string,
      row[8] as string,
      row[9] as string,
      row[11] as string,
      new Date(),
    );
    this.logger.logBook(book);
    await this.db.createBook(book);
  }
}
