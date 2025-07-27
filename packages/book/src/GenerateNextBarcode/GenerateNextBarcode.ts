import { Db } from '@repo/db/Db';

export type BarcodeStartChar = 'P' | 'A' | 'B';
export type GenerateNextBarcodeRequest = {
  barcodeStartChar: BarcodeStartChar;
};

export type GenerateNextBarcodeResponse = {
  barcode: string;
};

export class GenerateNextBarcode {
  private db!: Db;

  public setDb(db: Db) {
    this.db = db;
  }

  async generate(request: GenerateNextBarcodeRequest): Promise<GenerateNextBarcodeResponse> {
    const book = await this.db.getLastBookWithBarcodeStartChar(request.barcodeStartChar);
    if (!book) {
      return {
        barcode: this.createInitialBarcode(request.barcodeStartChar),
      };
    }
    const newBarcode = this.createNextBarcode(book.barcode, request.barcodeStartChar);

    return {
      barcode: newBarcode,
    };
  }

  createInitialBarcode(barcodeStartCharacter: BarcodeStartChar) {
    return `${barcodeStartCharacter}00000`;
  }

  createNextBarcode(lastBarcode: string, barcodeStartCharacter: BarcodeStartChar) {
    const numberPartOfBarcode = parseInt(lastBarcode.slice(1));
    const newBarcodeNumber = numberPartOfBarcode + 1;
    const paddedNewBarcodeNumber = newBarcodeNumber.toString().padStart(5, '0');
    return `${barcodeStartCharacter}${paddedNewBarcodeNumber}`;
  }
}
