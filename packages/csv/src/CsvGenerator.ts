export interface CsvGenerator {
  generate(header: string[], rows: string[][]): Promise<string>;
}
