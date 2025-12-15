import { jest } from "@jest/globals";
import BasePaymentMethodUsecase from "../BasePaymentMethodUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BasePaymentMethodUsecase {}

describe("BasePaymentMethodUsecase", () => {
	let paymentMethodService;

	beforeEach(() => {
		paymentMethodService = { getPaymentMethodByName: jest.fn() };
	});

	test("should throw when service missing", () => {
		expect(() => new BasePaymentMethodUsecase()).toThrow("PAYMENTMETHOD_USECASE.MISSING_SERVICE");
	});

	test("_normalize should trim and lowercase", () => {
		const usecase = new DummyUsecase({ paymentMethodService });
		expect(usecase._normalize("  CASH ")).toBe("cash");
	});

	test("_toInt should return integer when valid", () => {
		const usecase = new DummyUsecase({ paymentMethodService });
		expect(usecase._toInt("5", "id")).toBe(5);
	});

	test("_toInt should throw when invalid", () => {
		const usecase = new DummyUsecase({ paymentMethodService });
		expect(() => usecase._toInt("abc")).toThrow(new ValidationError("id must be a positive integer"));
	});

	test("_assertNameAvailable should throw when name missing", async () => {
		const usecase = new DummyUsecase({ paymentMethodService });
		await expect(usecase._assertNameAvailable("  ")).rejects.toThrow(
			new ValidationError("Payment method name is required")
		);
	});

	test("_assertNameAvailable should throw when name exists", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue({ id: 1, name: "cash" });
		const usecase = new DummyUsecase({ paymentMethodService });

		await expect(usecase._assertNameAvailable("Cash")).rejects.toThrow(
			new ValidationError("Payment method cash already exists")
		);
	});

	test("_assertNameAvailable should allow when same id", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue({ id: 2, name: "cash" });
		const usecase = new DummyUsecase({ paymentMethodService });

		await expect(usecase._assertNameAvailable("Cash", 2)).resolves.toBe("cash");
	});

	test("_assertNameAvailable should return normalized when available", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue(null);
		const usecase = new DummyUsecase({ paymentMethodService });

		await expect(usecase._assertNameAvailable("  Card ")).resolves.toBe("card");
	});
});
