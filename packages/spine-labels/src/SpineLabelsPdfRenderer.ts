import { Label } from './GenerateSpineLabels';
import { Avery5160PdfRenderer } from '@repo/pdf-renderer/Avery5160PdfRenderer';
import { PdfRendererFileReader } from '@repo/pdf-renderer/PdfRenderer';

export class SpineLabelsPdfRenderer extends Avery5160PdfRenderer {
  constructor(reader: PdfRendererFileReader) {
    super(reader);
  }

  async drawLabels(labels: Label[]) {
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i]!;
      await this.drawLabel(label, i);
    }
  }

  private async drawLabel(label: Label, index: number) {
    const position = this.getLabelPosition(index);
    // this.drawDebugRectangle(index);
    this.drawLines(label, position);
  }

  private drawLines(label: Label, labelPosition: LabelPosition) {
    const lines = convertLabelToLines(label);
    for (let i = 0; i < lines.length; i++) {
      this.drawLine(labelPosition, i, lines[i]!);
    }
  }

  private drawLine(labelPosition: LabelPosition, lineIndex: number, text: string) {
    // some books have year_published like "民81[1992]"
    // which requires a chinese font to render
    this.drawText(
      labelPosition.x + LINE_X_OFFSET,
      labelPosition.y + LINE_Y_OFFSETS[lineIndex]!,
      text,
    );
  }
}

// offset of each line from the bottom-left corner of the label
const LINE_X_OFFSET = 40;
const LINE_Y_OFFSETS = [52, 42, 32, 22, 12];

const convertLabelToLines = (label: Label) => {
  const lines = [
    label.classificationNumber,
    label.authorNumber,
    label.copyNumber,
    label.yearPublished,
    label.barcode,
  ];
  return lines.filter(Boolean);
};

// bottom-left corner position of the label on the page
type LabelPosition = {
  x: number;
  y: number;
};
