import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  DATABASE_URL: string;
}

const envSchema = joi.object({
  DATABASE_URL: joi.string().required(),
});

const { error, value } = envSchema.validate({ ...process.env });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  DATABASE_URL: envVars.DATABASE_URL,
};
