import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export interface PdfRendererFileReader {
  readBasePDF(): Promise<Uint8Array>;
  readChineseFont(): Promise<Uint8Array>;
}

export interface Logger {
  logError(error: Record<string, unknown>): void;
}

export abstract class PdfRenderer {
  private pdfDoc!: PDFDocument;
  private page!: PDFPage;
  private englishFont!: PDFFont;
  private chineseFont!: PDFFont;
  public logger!: Logger;

  constructor(private reader: PdfRendererFileReader) {}

  protected async init() {
    const existingPdfBytes = await this.reader.readBasePDF();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const page0 = pages[0];
    this.pdfDoc = pdfDoc;
    this.page = page0!;
    this.englishFont = await this.pdfDoc.embedFont(StandardFonts.Helvetica, { subset: false });
    await this.configureChineseFont();
  }

  private async configureChineseFont() {
    this.pdfDoc.registerFontkit(fontkit);
    this.chineseFont = await this.pdfDoc.embedFont(await this.reader.readChineseFont(), {
      subset: false,
    });
  }

  protected async getPdfBytes() {
    return this.pdfDoc.save();
  }

  protected drawRectangle(x: number, y: number, width: number, height: number) {
    this.page.drawRectangle({
      x,
      y,
      width,
      height,
      color: rgb(1, 1, 1),
      borderWidth: 0.5,
    });
  }

  protected drawText(x: number, y: number, text: string) {
    if (containsChineseCharacters(text)) {
      this.drawChineseText(x, y, text);
      return;
    }
    this.drawEnglishAndNumberText(x, y, text);
  }

  protected drawEnglishAndNumberText(x: number, y: number, text: string) {
    try {
      this.page.drawText(text, {
        x,
        y,
        size: 10,
        font: this.englishFont!,
        color: rgb(0, 0, 0), // Black text color
      });
    } catch (error) {
      this.logger.logError({
        error: (error as Error).message,
        location: 'PdfRenderer.drawEnglishAndNumberText',
        text,
      });
      throw error;
    }
  }

  protected drawChineseText(x: number, y: number, text: string) {
    this.page.drawText(text, {
      x,
      y,
      size: 10,
      font: this.chineseFont,
      color: rgb(0, 0, 0), // Black text color
    });
  }

  protected async drawImage(
    image: Uint8Array,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    const pngImage = await this.pdfDoc.embedPng(image);
    this.page.drawImage(pngImage, {
      x,
      y,
      width,
      height,
    });
  }
}

function containsChineseCharacters(str: string) {
  const chineseCharPattern = /[\u4E00-\u9FFF]/;
  return chineseCharPattern.test(str);
}
