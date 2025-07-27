import { describe, it, expect, beforeEach } from '@jest/globals';
import { GenerateNextBarcode } from '../GenerateNextBarcode';
import { Db } from '@repo/db/Db';
import { Book } from '@repo/entities/Book';
import { B0BookStub } from './B0BookStub';
import { DbStub } from './DbStub';

describe('GenerateNextBarcode', () => {
  let generateNextBarcode: GenerateNextBarcode;

  beforeEach(() => {
    generateNextBarcode = new GenerateNextBarcode();
  });

  it('when no books found with the barcode start character, should throw an error', async () => {
    const db: Db = new DbStub();
    generateNextBarcode.setDb(db);
    try {
      await generateNextBarcode.generate({ barcodeStartChar: 'B' });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe('No books found with the barcode start character B');
    }
  });

  it('when last book is B0, should return B1', async () => {
    class ReturningB0DbStub extends DbStub {
      async getLastBookWithBarcodeStartChar(barcodeStartCharacter: string): Promise<Book | null> {
        return B0BookStub;
      }
    }

    const db: Db = new ReturningB0DbStub();
    generateNextBarcode.setDb(db);
    const barcode = await generateNextBarcode.generate({ barcodeStartChar: 'B' });
    expect(barcode).toEqual({ barcode: 'B00001' });
  });

  it('when no books found with the barcode start character, should return barcode 0 with the barcode start character', async () => {
    class ReturningNullDbStub extends DbStub {
      async getLastBookWithBarcodeStartChar(barcodeStartCharacter: string): Promise<Book | null> {
        return null;
      }
    }

    const db: Db = new ReturningNullDbStub();
    generateNextBarcode.setDb(db);
    const barcode = await generateNextBarcode.generate({ barcodeStartChar: 'B' });
    expect(barcode).toEqual({ barcode: 'B00000' });
  });
});
