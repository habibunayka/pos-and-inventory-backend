import Joi from "joi";

const posInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty("");
const kitchenOrderStatus = Joi.string().trim().valid("queued", "proses", "done");

export const createKitchenOrderSchema = Joi.object({
	transactionItemId: posInt.required(),
	status: kitchenOrderStatus,
	startedAt: Joi.date().iso().allow(null),
	finishedAt: Joi.date().iso().allow(null),
	note: nullableText
});

export const updateKitchenOrderSchema = Joi.object({
	transactionItemId: posInt,
	status: kitchenOrderStatus,
	startedAt: Joi.date().iso().allow(null),
	finishedAt: Joi.date().iso().allow(null),
	note: nullableText
}).min(1);

export default { create: createKitchenOrderSchema, update: updateKitchenOrderSchema };
