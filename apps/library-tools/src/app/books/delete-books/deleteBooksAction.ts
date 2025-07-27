'use server';

import { DbImpl } from '@repo/db-impl/DbImpl';
import { getPostgresUrl } from '../../../utils/env.ts';
import { DeleteBooks } from '@repo/book/DeleteBooks';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';
import { sessionGuard } from '../../../session.ts';

export async function deleteBooksAction(bookIds: string[]) {
  await sessionGuard();
  const isoToDateConverter = new ISOToDateConverterImpl();
  const db = new DbImpl(getPostgresUrl(), isoToDateConverter);
  const useCase = new DeleteBooks(db);
  return useCase.execute(bookIds);
}
