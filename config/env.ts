type EnvName = 'dev' | 'staging' | 'prod';

type EnvConfig = {
  baseURL: string;
  userId: number;
};

export const environments: Record<EnvName, EnvConfig> = {
  dev: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    userId: 1,
  },
  staging: {
    baseURL: 'https://staging.myapi.com',
    userId: 100,
  },
  prod: {
    baseURL: 'https://prod.myapi.com',
    userId: 500,
  },
};

export const config = () => {
  const env = (process.env.TEST_ENV as EnvName) || 'dev';
  return environments[env];
};
