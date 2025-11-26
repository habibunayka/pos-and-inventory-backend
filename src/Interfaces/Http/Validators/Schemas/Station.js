import Joi from "joi";

const positiveInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty("");

export const createStationSchema = Joi.object({
	placeId: positiveInt.required(),
	name: Joi.string().trim().min(1).required(),
	description: nullableText,
	isActive: Joi.boolean()
});

export const updateStationSchema = Joi.object({
	placeId: positiveInt,
	name: Joi.string().trim().min(1),
	description: nullableText,
	isActive: Joi.boolean()
}).min(1);

export default {
	create: createStationSchema,
	update: updateStationSchema
};
