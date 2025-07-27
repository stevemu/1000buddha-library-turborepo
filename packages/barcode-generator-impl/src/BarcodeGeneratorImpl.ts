import bwipjs from 'bwip-js';
import { BarcodeGenerator } from '@repo/barcode-generator/BarcodeGenerator';

export class BarcodeGeneratorImpl implements BarcodeGenerator {
  async generate(text: string): Promise<Uint8Array> {
    return bwipjs.toBuffer({
      bcid: 'code39', // Barcode type (Code 39)
      text: text, // Text to encode
      scale: 1, // Adjust scale to make the barcode smaller to fit
      height: 3, // Bar height, in millimeters
      includetext: false, // Exclude human-readable text (we'll add it manually)
    });
  }
}
