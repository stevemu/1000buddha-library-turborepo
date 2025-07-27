'use server';

import { GenerateLibraryCard } from '@repo/library-card/GenerateLibraryCard';
import { LibraryCardPdfRendererFileReader } from '@repo/library-card/LibraryCardPdfRendererFileReader';
import { BinaryToBase64ConverterImpl } from '@repo/binary-to-base64-impl/BinaryToBase64ConverterImpl';
import { LibraryCardPdfRenderer } from '@repo/library-card/LibraryCardPdfRenderer';
import { BarcodeGeneratorImpl } from '@repo/barcode-generator-impl/BarcodeGeneratorImpl';
import { sessionGuard } from '../../session.ts';

export const createLibraryCardAction = async ({
  name,
  barcode,
}: {
  name: string;
  barcode: string;
}) => {
  await sessionGuard();
  const fileReader = new LibraryCardPdfRendererFileReader();
  const pdfRenderer = new LibraryCardPdfRenderer(fileReader);
  const generateLibraryCard = new GenerateLibraryCard(
    new BarcodeGeneratorImpl(),
    pdfRenderer,
    new BinaryToBase64ConverterImpl(),
  );
  return generateLibraryCard.generate({ name, barcode });
};
