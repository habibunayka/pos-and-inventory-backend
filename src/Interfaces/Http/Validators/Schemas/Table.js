import Joi from "joi";

const positiveInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty("");

export const createTableSchema = Joi.object({
	placeId: positiveInt.required(),
	name: Joi.string().trim().min(1).required(),
	status: nullableText,
	capacity: positiveInt.required()
});

export const updateTableSchema = Joi.object({
	placeId: positiveInt,
	name: Joi.string().trim().min(1),
	status: nullableText,
	capacity: positiveInt
}).min(1);

export default {
	create: createTableSchema,
	update: updateTableSchema
};
