// type EnvName = 'dev' | 'staging' | 'prod';

// type EnvConfig = {
//   baseURL: string;
//   userId: number;
// };

// export const environments: Record<EnvName, EnvConfig> = {
//   dev: {
//     baseURL: 'https://jsonplaceholder.typicode.com',
//     userId: 1,
//   },
//   staging: {
//     baseURL: 'https://staging.myapi.com',
//     userId: 100,
//   },
//   prod: {
//     baseURL: 'https://prod.myapi.com',
//     userId: 500,
//   },
// };

// export const config = () => {
//   const env = (process.env.TEST_ENV as EnvName) || 'dev';
//   return environments[env];
// };
type EnvName = 'dev' | 'staging' | 'prod';

type EnvConfig = {
  baseURL: string;
  token: string;
};

export const environments: Record<EnvName, EnvConfig> = {
  dev: {
    baseURL: 'https://api.dev.com',
    token: 'your-dev-token',
  },
  staging: {
    baseURL: 'https://api.staging.com',
    token: process.env.STAGING_TOKEN || '',
  },
  prod: {
    baseURL: 'https://prod.myapi.com',
    token: process.env.PROD_TOKEN || '',
  },
};

export const config = () => {
  const env = (process.env.TEST_ENV as EnvName) || 'dev';
  return environments[env];
};
