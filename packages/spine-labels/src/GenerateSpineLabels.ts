import { Db } from '@repo/db/Db';
import { Book } from '@repo/entities/Book';
import { BinaryToBase64Converter } from '@repo/binary-to-base64/BinaryToBase64Converter';
import { Avery5160PdfRenderer } from '@repo/pdf-renderer/Avery5160PdfRenderer';

export class Label {
  constructor(
    public readonly classificationNumber: string,
    public readonly authorNumber: string,
    public readonly copyNumber: string,
    public readonly yearPublished: string,
    public readonly barcode: string,
  ) {}
}

export class GenerateSpineLabels {
  constructor(
    private db: Db,
    private pdfRenderer: Avery5160PdfRenderer,
    private binaryToBase64Converter: BinaryToBase64Converter,
  ) {}

  async execute(bookIds: string[]) {
    const books: Book[] = await this.db.getBooks(bookIds);
    const labels: Label[] = this.convertBooksToLabels(books);
    const pdfBytes = await this.pdfRenderer.runDrawLabels(labels);
    return this.binaryToBase64Converter.convert(pdfBytes);
  }

  private convertBooksToLabels(books: Book[]) {
    const labels: Label[] = [];
    for (const book of books) {
      const label = this.convertBookToLabel(book);
      labels.push(label);
    }
    return labels;
  }

  private convertBookToLabel(book: Book): Label {
    return new Label(
      book.classificationNumber,
      book.authorNumber,
      book.yearPublished,
      book.copyNumber,
      book.barcode,
    );
  }
}
