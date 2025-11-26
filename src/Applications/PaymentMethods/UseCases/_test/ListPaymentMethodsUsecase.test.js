import { jest } from "@jest/globals";
import ListPaymentMethodsUsecase from "../ListPaymentMethodsUsecase.js";

describe("ListPaymentMethodsUsecase", () => {
	let paymentMethodService;
	let usecase;

	beforeEach(() => {
		paymentMethodService = { listPaymentMethods: jest.fn() };
		usecase = new ListPaymentMethodsUsecase({ paymentMethodService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPaymentMethodsUsecase()).toThrow("PAYMENTMETHOD_USECASE.MISSING_SERVICE");
	});

	test("should list payment methods", async () => {
		const records = [{ id: 1 }];
		paymentMethodService.listPaymentMethods.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(paymentMethodService.listPaymentMethods).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
