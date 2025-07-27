import { Logger } from '@repo/pdf-renderer/PdfRenderer';

export class LoggerImpl implements Logger {
  logError(error: Record<string, unknown>) {
    console.error(error);
  }
}
