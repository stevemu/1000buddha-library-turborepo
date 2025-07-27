import fs from 'fs/promises';
import { parseString } from '@fast-csv/parse';
import { CsvReader } from './Seed';

export class CsvReaderImpl implements CsvReader {
  async readCsv(filePath: string): Promise<string[][]> {
    return new Promise(async (resolve, reject) => {
      const seedCsvFile = await fs.readFile(filePath, 'utf8');
      const rows: any = [];
      parseString(seedCsvFile)
        .on('data', (row) => rows.push(row))
        .on('error', (error) => reject(error))
        .on('end', () => resolve(rows));
    });
  }
}
