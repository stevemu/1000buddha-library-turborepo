import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

export const init = ({
  clientToken,
  env,
  service,
  rumApplicationId,
  rumEnabled,
}: {
  clientToken: string;
  env: string;
  service: string;
  rumApplicationId: string;
  rumEnabled: boolean;
}) => {
  const commonOptions = {
    clientToken,
    env,
    service,
    site: 'datadoghq.com',
  };

  datadogLogs.init({
    ...commonOptions,
    forwardErrorsToLogs: false,
    sessionSampleRate: 100,
  });

  if (rumEnabled) {
    datadogRum.init({
      ...commonOptions,
      applicationId: rumApplicationId,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: false,
      defaultPrivacyLevel: 'allow',
    });
  }
};
