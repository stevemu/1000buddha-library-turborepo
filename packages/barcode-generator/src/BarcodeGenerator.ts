export interface BarcodeGenerator {
  generate(text: string): Promise<Uint8Array>;
}
