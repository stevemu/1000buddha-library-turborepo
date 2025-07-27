import { CsvGenerator } from './CsvGenerator';
import { writeToString } from '@fast-csv/format';

export class CsvGeneratorImpl implements CsvGenerator {
  async generate(header: string[], bodyRows: string[][]): Promise<string> {
    const allRows: string[][] = [header, ...bodyRows];
    return writeToString(allRows);
  }
}
