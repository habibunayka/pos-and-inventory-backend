import { jest } from "@jest/globals";
import UpdatePaymentMethodUsecase from "../UpdatePaymentMethodUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdatePaymentMethodUsecase", () => {
	let paymentMethodService;
	let usecase;

	beforeEach(() => {
		paymentMethodService = { getPaymentMethodByName: jest.fn(), updatePaymentMethod: jest.fn() };
		usecase = new UpdatePaymentMethodUsecase({ paymentMethodService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePaymentMethodUsecase()).toThrow("PAYMENTMETHOD_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", {})).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when name exists", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue({ id: 2, name: "cash" });

		await expect(usecase.execute(1, { name: "cash" })).rejects.toThrow(
			new ValidationError("Payment method cash already exists")
		);
	});

	test("should throw when record not found", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue(null);
		paymentMethodService.updatePaymentMethod.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "card" })).rejects.toThrow(
			new ValidationError("Payment method not found")
		);
	});

	test("should update payment method with normalized data", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue(null);
		const updated = { id: 2, name: "card" };
		paymentMethodService.updatePaymentMethod.mockResolvedValue(updated);

		const result = await usecase.execute("2", { name: " Card ", description: " desc ", isActive: false });

		expect(paymentMethodService.updatePaymentMethod).toHaveBeenCalledWith({
			id: 2,
			data: { name: "card", description: " desc ", isActive: false }
		});
		expect(result).toEqual(updated);
	});
});
