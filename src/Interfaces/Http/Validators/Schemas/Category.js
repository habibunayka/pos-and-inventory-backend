import Joi from "joi";

const categoryType = Joi.string().trim().lowercase().valid("menu", "ingredient");

export const createCategorySchema = Joi.object({
	name: Joi.string().trim().lowercase().min(1).required(),
	type: categoryType
});

export const updateCategorySchema = Joi.object({
	name: Joi.string().trim().lowercase().min(1),
	type: categoryType
}).min(1);

export default {
	create: createCategorySchema,
	update: updateCategorySchema
};
