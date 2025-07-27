import { BinaryToBase64Converter } from '@repo/binary-to-base64/BinaryToBase64Converter';
import { Book } from '@repo/entities/Book';
import { Db } from '@repo/db/Db';
import { Avery5160PdfRenderer } from '@repo/pdf-renderer/Avery5160PdfRenderer';
import { BarcodeGenerator } from '@repo/barcode-generator/BarcodeGenerator';

export type Label = {
  chineseHeaderText: string;
  barcodeImage: Uint8Array;
  barcodeValue: string;
};

export class GenerateBarcodeLabels {
  constructor(
    private db: Db,
    private barcodeGenerator: BarcodeGenerator,
    private pdfRenderer: Avery5160PdfRenderer,
    private binaryToBase64Converter: BinaryToBase64Converter,
  ) {}

  async execute(bookIds: string[]) {
    const books: Book[] = await this.db.getBooks(bookIds);
    const barcodes = [];
    for (const book of books) {
      barcodes.push(book.barcode);
    }
    const labels = await this.createLabels(barcodes);
    const pdfBinary = await this.pdfRenderer.runDrawLabels(labels);
    return this.binaryToBase64Converter.convert(pdfBinary);
  }

  async createLabels(barcodes: string[]) {
    const labels = [];
    for (let i = 0; i < barcodes.length; i++) {
      const label = await this.createLabel(barcodes[i] as string);
      labels.push(label);
    }
    return labels;
  }

  async createLabel(barcode: string) {
    const label = {
      chineseHeaderText: '千佛寺圖書館',
      barcodeImage: await this.barcodeGenerator.generate(barcode),
      barcodeValue: barcode,
    };
    return label;
  }
}
