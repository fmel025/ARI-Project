import * as Joi from 'joi';

export const schema = Joi.object({
  PORT: Joi.number().port().default(3000),
  HASH_ALGORITHM: Joi.string().required(),
  ENCRYPTION_ALGORITHM: Joi.string().required(),
});
