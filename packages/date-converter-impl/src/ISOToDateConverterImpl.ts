import { ISOToDateConverter } from '@repo/date-converter/ISOToDateConverter';
import { parseISO } from '@repo/date-util';

export class ISOToDateConverterImpl implements ISOToDateConverter {
  convert(isoString: string) {
    return parseISO(isoString);
  }
}
