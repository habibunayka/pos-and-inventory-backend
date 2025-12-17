import { jest } from "@jest/globals";
import GetDeliveryIntegrationUsecase from "../GetDeliveryIntegrationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetDeliveryIntegrationUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			getDeliveryIntegration: jest.fn()
		};
		usecase = new GetDeliveryIntegrationUsecase({ deliveryIntegrationService: mockService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetDeliveryIntegrationUsecase()).toThrow("DELIVERYINTEGRATION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id is invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		mockService.getDeliveryIntegration.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Delivery integration not found"));
	});

	test("should return delivery integration when found", async () => {
		const record = { id: 2, platformName: "GoFood" };
		mockService.getDeliveryIntegration.mockResolvedValue(record);

		const result = await usecase.execute("2");

		expect(mockService.getDeliveryIntegration).toHaveBeenCalledWith(2);
		expect(result).toEqual(record);
	});
});
