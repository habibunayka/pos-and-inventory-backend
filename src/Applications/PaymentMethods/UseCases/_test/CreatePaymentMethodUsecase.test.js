import { jest } from "@jest/globals";
import CreatePaymentMethodUsecase from "../CreatePaymentMethodUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreatePaymentMethodUsecase", () => {
	let paymentMethodService;
	let usecase;

	beforeEach(() => {
		paymentMethodService = { getPaymentMethodByName: jest.fn(), createPaymentMethod: jest.fn() };
		usecase = new CreatePaymentMethodUsecase({ paymentMethodService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePaymentMethodUsecase()).toThrow("PAYMENTMETHOD_USECASE.MISSING_SERVICE");
	});

	test("should throw when name missing", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(
			new ValidationError("Payment method name is required")
		);
	});

	test("should throw when name exists", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue({ id: 1, name: "cash" });

		await expect(usecase.execute({ name: "Cash" })).rejects.toThrow(
			new ValidationError("Payment method cash already exists")
		);
	});

	test("should create payment method with defaults", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue(null);
		const created = { id: 2, name: "cash" };
		paymentMethodService.createPaymentMethod.mockResolvedValue(created);

		const result = await usecase.execute({ name: " Cash ", description: null });

		expect(paymentMethodService.createPaymentMethod).toHaveBeenCalledWith({
			name: "cash",
			description: null,
			isActive: true
		});
		expect(result).toEqual(created);
	});

	test("should pass isActive when provided", async () => {
		paymentMethodService.getPaymentMethodByName.mockResolvedValue(null);
		paymentMethodService.createPaymentMethod.mockResolvedValue({ id: 3, name: "card", isActive: false });

		await usecase.execute({ name: "card", isActive: false });

		expect(paymentMethodService.createPaymentMethod).toHaveBeenCalledWith({
			name: "card",
			description: null,
			isActive: false
		});
	});
});
