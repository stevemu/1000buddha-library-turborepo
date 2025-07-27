import { PdfRendererFileReader } from '@repo/pdf-renderer/PdfRenderer';
import { ChineseFontFileReader } from '@repo/pdf-renderer/ChineseFontFileReader';

export class LibraryCardPdfRendererFileReader
  extends ChineseFontFileReader
  implements PdfRendererFileReader
{
  async readBasePDF(): Promise<Buffer> {
    const res = await fetch(
      'https://1000buddha-library-tools.s3.amazonaws.com/library_card_base_one.pdf',
    );
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  }
}
