import { Label } from './GenerateBarcodeLabels';
import { Avery5160PdfRenderer } from '@repo/pdf-renderer/Avery5160PdfRenderer';
import { PdfRendererFileReader } from '@repo/pdf-renderer/PdfRenderer';

export class BarcodeLabelPdfRenderer extends Avery5160PdfRenderer {
  constructor(reader: PdfRendererFileReader) {
    super(reader);
  }

  async drawLabels(labels: Label[]) {
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i]!;
      // this.drawDebugRectangle(i);
      await this.drawLabel(label, i);
    }
  }

  async drawLabel(label: Label, labelIndex: number) {
    const position = this.getLabelPosition(labelIndex);
    this.drawEnglishAndNumberText(position.x + 30, position.y + 48, 'Thousand Buddha Temple');
    await this.drawImage(label.barcodeImage, position.x + 40, position.y + 15, 100, 30);
    this.drawEnglishAndNumberText(position.x + 72, position.y + 6, label.barcodeValue);
  }
}
