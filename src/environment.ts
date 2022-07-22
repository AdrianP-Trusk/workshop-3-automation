import dotenv from 'dotenv';

dotenv.config();

type EnvironmentConfig = {
  truskApiBaseUrl: string
  truskBusinessBaseUrl: string
}

const environment: EnvironmentConfig = {
  truskApiBaseUrl: process.env.TRUSK_API_BASE_URL as string,
  truskBusinessBaseUrl: process.env.TRUSK_BUSINESS_BASE_URL as string,
};

export default environment;
