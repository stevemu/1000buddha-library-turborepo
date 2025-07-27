import { PdfRendererFileReader } from './PdfRenderer';
import { ChineseFontFileReader } from './ChineseFontFileReader';

export class EmptyPdfFileReader extends ChineseFontFileReader implements PdfRendererFileReader {
  async readBasePDF(): Promise<Buffer> {
    // const res = await fetch(
    //   'https://1000buddha-library-tools.s3.amazonaws.com/Avery5160EasyPeelAddressLabels.pdf',
    // );
    const res = await fetch('https://1000buddha-library-tools.s3.amazonaws.com/empty.pdf');
    const buffer = await res.arrayBuffer();
    return Buffer.from(buffer);
  }
}
