export const getPostgresUrl = () => {
  return process.env.POSTGRES_URL!;
};

export const getDatadogClientToken = () => {
  return process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!;
};

export const getDatadogEnv = () => {
  return process.env.NEXT_PUBLIC_DATADOG_ENV!;
};

export const getDatadogRumApplicationId = () => {
  return process.env.NEXT_PUBLIC_DATADOG_RUM_APPLICATION_ID!;
};

export const getDatadogRumEnabled = () => {
  return process.env.NEXT_PUBLIC_DATADOG_RUM_ENABLED === '1';
};

export const getIronSessionPassword = () => {
  return process.env.IRON_SESSION_PASSWORD!;
};

export const getLoginPassword = () => {
  return process.env.LOGIN_PASSWORD!;
};
