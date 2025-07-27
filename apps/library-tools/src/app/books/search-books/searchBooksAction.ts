'use server';

import { DbImpl } from '@repo/db-impl/DbImpl';
import { SearchBooks, SearchBooksResponse } from '@repo/book/SearchBooks';
import { getPostgresUrl } from '../../../utils/env.ts';
import { ResponseConverterImpl } from '@repo/book/ResponseConverterImpl';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';
import { sessionGuard } from '../../../session.ts';

export async function searchBooksAction({
  searchTerm,
  page,
  pageSize,
}: {
  searchTerm: string;
  page: number;
  pageSize: number;
}): Promise<SearchBooksResponse> {
  await sessionGuard();
  const isoToDateConverter = new ISOToDateConverterImpl();
  const db = new DbImpl(getPostgresUrl(), isoToDateConverter);
  const responseConverter = new ResponseConverterImpl();
  const useCase = new SearchBooks(db, responseConverter);
  return useCase.execute({ searchTerm, page, pageSize });
}
