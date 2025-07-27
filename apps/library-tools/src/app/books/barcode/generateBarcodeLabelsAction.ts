'use server';

import { BinaryToBase64ConverterImpl } from '@repo/binary-to-base64-impl/BinaryToBase64ConverterImpl';
import { BarcodeLabelPdfRenderer } from '@repo/generate-barcode-labels/BarcodeLabelPdfRenderer';
import { GenerateBarcodeLabels } from '@repo/generate-barcode-labels/GenerateBarcodeLabels';
import { EmptyPdfFileReader } from '@repo/pdf-renderer/EmptyPdfFileReader';
import { DbImpl } from '@repo/db-impl/DbImpl';
import { getPostgresUrl } from '../../../utils/env.ts';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';
import { BarcodeGeneratorImpl } from '@repo/barcode-generator-impl/BarcodeGeneratorImpl';
import { sessionGuard } from '../../../session.ts';
import { LoggerImpl } from '../../../impls/LoggerImpl.ts';

export async function generateBarcodeLabelsAction(bookIds: string[]) {
  await sessionGuard();
  const fileReader = new EmptyPdfFileReader();
  const barcodeGenerator = new BarcodeGeneratorImpl();
  const pdfRenderer = new BarcodeLabelPdfRenderer(fileReader);
  pdfRenderer.logger = new LoggerImpl();
  const binaryToBase64Converter = new BinaryToBase64ConverterImpl();
  const isoToDateConverter = new ISOToDateConverterImpl();
  const db = new DbImpl(getPostgresUrl(), isoToDateConverter);
  const useCase = new GenerateBarcodeLabels(
    db,
    barcodeGenerator,
    pdfRenderer,
    binaryToBase64Converter,
  );
  return useCase.execute(bookIds);
}
