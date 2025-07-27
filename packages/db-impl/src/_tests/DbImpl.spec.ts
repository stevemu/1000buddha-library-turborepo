import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DbImpl } from '../DbImpl';
import { Book } from '@repo/entities/Book';
import { ISOToDateConverter } from '@repo/date-converter/ISOToDateConverter';

class StubISOToDateConverter implements ISOToDateConverter {
  convert(isoString: string) {
    return new Date();
  }
}

describe('DbImpl', () => {
  let uri: string;
  let db: DbImpl;
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();
    uri = container!.getConnectionUri();
    db = new DbImpl(uri, new StubISOToDateConverter());
    await db.initBookTable();
  });

  afterEach(async () => {
    await db.deleteAllBooks();
  });

  afterAll(async () => {
    await db.disconnect();
    await container!.stop();
  });

  it('there a book, should return the book', async () => {
    await db.createBook(createBookStub('B0'));
    const book = await db.getLastBookWithBarcodeStartChar('B');
    expect(book!.barcode).toBe('B0');
  });

  it('there are many books, should return the last book based on barcode', async () => {
    await db.createBook(createBookStub('B0'));
    await db.createBook(createBookStub('B1'));
    await db.createBook(createBookStub('B2'));
    await db.createBook(createBookStub('B3'));
    const book = await db.getLastBookWithBarcodeStartChar('B');
    expect(book!.barcode).toBe('B3');
  });

  it('when no books found with the barcode start character, should return null', async () => {
    const book = await db.getLastBookWithBarcodeStartChar('B');
    expect(book).toBeNull();
  });
});

const createBookStub = (barcode: string) => {
  return new Book(
    barcode,
    barcode,
    'test',
    'test',
    'category',
    'classificationNumber',
    'authorNumber',
    'author',
    'yearPublished',
    'placeOfPublication',
    'publisher',
    new Date(),
  );
};
