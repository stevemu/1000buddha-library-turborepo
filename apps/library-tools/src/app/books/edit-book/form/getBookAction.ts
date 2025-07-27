'use server';

import { DbImpl } from '@repo/db-impl/DbImpl';
import { getPostgresUrl } from '../../../../utils/env.ts';
import { GetBook, GetBookRequest, GetBookResponse } from '@repo/book/GetBook';
import { ResponseConverterImpl } from '@repo/book/ResponseConverterImpl';
import { ISOToDateConverterImpl } from '@repo/date-converter-impl/ISOToDateConverterImpl';

export async function getBookAction(request: GetBookRequest): Promise<GetBookResponse> {
  const isoToDateConverter = new ISOToDateConverterImpl();
  const db = new DbImpl(getPostgresUrl(), isoToDateConverter);
  const converter = new ResponseConverterImpl();
  const useCase = new GetBook(db, converter);
  return useCase.execute(request);
}
