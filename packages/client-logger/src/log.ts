import { datadogLogs } from '@datadog/browser-logs';

export const logInfo = ({
  message,
  context,
}: {
  message: string;
  context?: Record<string, unknown>;
}) => {
  datadogLogs.logger.info(message, context);
};

export const logError = ({
  message,
  context,
  error,
}: {
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}) => {
  datadogLogs.logger.error(message, context, error);
};
