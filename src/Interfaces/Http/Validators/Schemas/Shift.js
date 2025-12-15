import Joi from "joi";

const positiveInt = Joi.number().integer().positive();
const timeString = Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/);
const nullableText = Joi.string().trim().allow(null).empty("");

export const createShiftSchema = Joi.object({
	placeId: positiveInt.required(),
	name: Joi.string().trim().min(1).required(),
	startTime: timeString.required(),
	endTime: timeString.required(),
	description: nullableText,
	isActive: Joi.boolean()
});

export const updateShiftSchema = Joi.object({
	placeId: positiveInt,
	name: Joi.string().trim().min(1),
	startTime: timeString,
	endTime: timeString,
	description: nullableText,
	isActive: Joi.boolean()
}).min(1);

export default {
	create: createShiftSchema,
	update: updateShiftSchema
};
