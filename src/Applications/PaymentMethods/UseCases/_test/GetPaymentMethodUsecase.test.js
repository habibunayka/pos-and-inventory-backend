import { jest } from "@jest/globals";
import GetPaymentMethodUsecase from "../GetPaymentMethodUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetPaymentMethodUsecase", () => {
	let paymentMethodService;
	let usecase;

	beforeEach(() => {
		paymentMethodService = { getPaymentMethod: jest.fn() };
		usecase = new GetPaymentMethodUsecase({ paymentMethodService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPaymentMethodUsecase()).toThrow("PAYMENTMETHOD_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when payment method not found", async () => {
		paymentMethodService.getPaymentMethod.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Payment method not found"));
	});

	test("should return payment method when found", async () => {
		paymentMethodService.getPaymentMethod.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(paymentMethodService.getPaymentMethod).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
