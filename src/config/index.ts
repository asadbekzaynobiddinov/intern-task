import * as dotenv from 'dotenv';

dotenv.config();

export type ConfigType = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_BASE: string;
  ACCESS_KEY: string;
  ACCESS_TIME: string;
  REFRESH_KEY: string;
  REFRESH_TIME: string;
};

export const config: ConfigType = {
  PORT: Number(process.env.PORT),
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_BASE: process.env.DB_BASE as string,
  ACCESS_KEY: process.env.ACCESS_KEY as string,
  ACCESS_TIME: process.env.ACCESS_TIME as string,
  REFRESH_KEY: process.env.REFRESH_KEY as string,
  REFRESH_TIME: process.env.REFRESH_TIME as string,
};
