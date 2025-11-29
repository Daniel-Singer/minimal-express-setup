import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  accessTokenSecret: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: String(process.env.MONGO_URI) || '',
  accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET) || '',
};

export default config;
