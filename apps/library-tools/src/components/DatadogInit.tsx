'use client';

import { init } from '@repo/client-logger/init';
import { useEffect } from 'react';
import {
  getDatadogClientToken,
  getDatadogEnv,
  getDatadogRumApplicationId,
  getDatadogRumEnabled,
} from '../utils/env.ts';

let initialized = false;

export const DatadogInit = () => {
  useEffect(() => {
    if (initialized) {
      return;
    }
    const clientToken = getDatadogClientToken();
    const env = getDatadogEnv();
    const rumApplicationId = getDatadogRumApplicationId();
    const rumEnabled = getDatadogRumEnabled();
    init({
      clientToken,
      env,
      service: '1000buddha-library-tools',
      rumApplicationId,
      rumEnabled,
    });
    initialized = true;
  }, []);

  return null;
};
