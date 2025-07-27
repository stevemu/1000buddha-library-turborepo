import { Logger, Seed } from './Seed';
import { CsvReaderImpl } from './CsvReaderImpl';
import { DbImpl } from '@repo/db-impl/DbImpl';
import { UUIDGeneratorImpl } from '@repo/uuid-impl/UUIDGeneratorImpl';
import { Book } from '@repo/entities/Book';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';

class LoggerImpl implements Logger {
  logBook(book: Book) {
    console.log(book);
  }
}

async function main() {
  require('dotenv').config();
  let connectionString = process.env.POSTGRES_URL!;
  const isoToDateConverter = new ISOToDateConverterImpl();
  const db = new DbImpl(connectionString!, isoToDateConverter);
  const reader = new CsvReaderImpl();
  const uuidGenerator = new UUIDGeneratorImpl();
  const logger = new LoggerImpl();
  const seed = new Seed(db, reader, uuidGenerator, logger);
  await seed.execute();
}

main().then(async () => {
  console.log('done');
});
