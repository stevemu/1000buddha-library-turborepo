'use server';

import { DbImpl } from '@repo/db-impl/DbImpl';
import { getPostgresUrl } from '../../../../../utils/env.ts';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';
import { BarcodeStartChar, GenerateNextBarcode } from '@repo/book/GenerateNextBarcode';

export const getNextBarcodeAction = async (barcodeStartChar: BarcodeStartChar) => {
  const db = new DbImpl(getPostgresUrl(), new ISOToDateConverterImpl());
  const generateNextBarcode = new GenerateNextBarcode();
  generateNextBarcode.setDb(db);
  return generateNextBarcode.generate({ barcodeStartChar });
};
