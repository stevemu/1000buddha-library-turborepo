import { PdfRenderer, PdfRendererFileReader } from './PdfRenderer';
import { LABEL_HEIGHT, LABEL_POSITIONS, LABEL_WIDTH } from './labelPositionsOfficePrinter';

export abstract class Avery5160PdfRenderer extends PdfRenderer {
  constructor(reader: PdfRendererFileReader) {
    super(reader);
  }

  public async runDrawLabels(labels: unknown) {
    await this.init();
    await this.drawLabels(labels);
    return this.getPdfBytes();
  }

  protected abstract drawLabels(labels: unknown): Promise<void>;

  // return bottom-left corner position of the label
  protected getLabelPosition(index: number) {
    return LABEL_POSITIONS[index]!;
  }

  protected drawDebugRectangle(index: number) {
    const position = this.getLabelPosition(index);
    this.drawRectangle(position.x, position.y, LABEL_WIDTH, LABEL_HEIGHT);
  }
}
