import Joi from "joi";

const positiveInt = Joi.number().integer().positive();

export const createIngredientSchema = Joi.object({
	name: Joi.string().trim().min(1).required(),
	unitId: positiveInt.required(),
	categoryId: positiveInt.allow(null)
});

export const updateIngredientSchema = Joi.object({
	name: Joi.string().trim().min(1),
	unitId: positiveInt,
	categoryId: positiveInt.allow(null)
}).min(1);

export default {
	create: createIngredientSchema,
	update: updateIngredientSchema
};
