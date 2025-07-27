import { PdfRenderer, PdfRendererFileReader } from '@repo/pdf-renderer/PdfRenderer';

export class LibraryCardPdfRenderer extends PdfRenderer implements LibraryCardPdfRenderer {
  constructor(reader: PdfRendererFileReader) {
    super(reader);
  }

  async createPdf({
    name,
    barcodeImage,
    barcode,
  }: {
    name: string;
    barcodeImage: Uint8Array;
    barcode: string;
  }) {
    await this.init();
    this.drawText(82, 680, name);
    await this.drawImage(barcodeImage, 45, 645, 90, 20);
    this.drawText(45, 635, barcode);
    return this.getPdfBytes();
  }
}
