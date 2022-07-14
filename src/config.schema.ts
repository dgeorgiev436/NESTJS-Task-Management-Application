import * as Joi from "@hapi/joi"


// Config Validation Schema With Joi
export const configValidationSchema = Joi.object({
	STAGE: Joi.string().required(),
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().default(5432).required(),
	DB_USERNAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_DATABASE: Joi.string().required()
})