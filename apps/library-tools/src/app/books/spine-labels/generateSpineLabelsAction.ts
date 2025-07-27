'use server';

import { DbImpl } from '@repo/db-impl/DbImpl';
import { getPostgresUrl } from '../../../utils/env.ts';
import { GenerateSpineLabels } from '@repo/spine-labels/GenerateSpineLabels';
import { SpineLabelsPdfRenderer } from '@repo/spine-labels/SpineLabelsPdfRenderer';
import { BinaryToBase64ConverterImpl } from '@repo/binary-to-base64-impl/BinaryToBase64ConverterImpl';
import { EmptyPdfFileReader } from '@repo/pdf-renderer/EmptyPdfFileReader';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';
import { sessionGuard } from '../../../session.ts';
import { LoggerImpl } from '../../../impls/LoggerImpl.ts';

export async function generateSpineLabelsAction(barcodes: string[]) {
  await sessionGuard();
  const isoToDateConverter = new ISOToDateConverterImpl();
  const db = new DbImpl(getPostgresUrl(), isoToDateConverter);
  const fileReader = new EmptyPdfFileReader();
  const pdfDrawer = new SpineLabelsPdfRenderer(fileReader);
  pdfDrawer.logger = new LoggerImpl();
  const binaryToBase64Converter = new BinaryToBase64ConverterImpl();
  const useCase = new GenerateSpineLabels(db, pdfDrawer, binaryToBase64Converter);
  return useCase.execute(barcodes);
}
