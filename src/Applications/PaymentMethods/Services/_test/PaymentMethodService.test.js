import { jest } from "@jest/globals";
import PaymentMethodService from "../PaymentMethodService.js";

describe("PaymentMethodService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findByName: jest.fn(),
			createPaymentMethod: jest.fn(),
			updatePaymentMethod: jest.fn(),
			deletePaymentMethod: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new PaymentMethodService()).toThrow("PAYMENTMETHOD_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new PaymentMethodService({ paymentMethodRepository: badRepo })).toThrow(
			"PAYMENTMETHOD_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listPaymentMethods should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new PaymentMethodService({ paymentMethodRepository: mockRepo });

		const result = service.listPaymentMethods();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getPaymentMethod should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new PaymentMethodService({ paymentMethodRepository: mockRepo });

		const result = service.getPaymentMethod(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("getPaymentMethodByName should delegate to repository", async () => {
		mockRepo.findByName.mockResolvedValue({ id: 3 });
		const service = new PaymentMethodService({ paymentMethodRepository: mockRepo });

		const result = service.getPaymentMethodByName("cash");

		expect(mockRepo.findByName).toHaveBeenCalledWith("cash");
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("createPaymentMethod should delegate to repository", async () => {
		mockRepo.createPaymentMethod.mockResolvedValue({ id: 4 });
		const service = new PaymentMethodService({ paymentMethodRepository: mockRepo });

		const result = service.createPaymentMethod({ name: "Cash" });

		expect(mockRepo.createPaymentMethod).toHaveBeenCalledWith({ name: "Cash" });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("updatePaymentMethod should delegate to repository", async () => {
		mockRepo.updatePaymentMethod.mockResolvedValue({ id: 5 });
		const service = new PaymentMethodService({ paymentMethodRepository: mockRepo });

		const result = service.updatePaymentMethod({ id: 5, data: { name: "Card" } });

		expect(mockRepo.updatePaymentMethod).toHaveBeenCalledWith({ id: 5, data: { name: "Card" } });
		await expect(result).resolves.toEqual({ id: 5 });
	});

	test("deletePaymentMethod should delegate to repository", async () => {
		mockRepo.deletePaymentMethod.mockResolvedValue(true);
		const service = new PaymentMethodService({ paymentMethodRepository: mockRepo });

		const result = service.deletePaymentMethod(6);

		expect(mockRepo.deletePaymentMethod).toHaveBeenCalledWith(6);
		await expect(result).resolves.toBe(true);
	});
});
