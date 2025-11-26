import { jest } from "@jest/globals";
import DeleteDeliveryIntegrationUsecase from "../DeleteDeliveryIntegrationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeleteDeliveryIntegrationUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			deleteDeliveryIntegration: jest.fn()
		};
		usecase = new DeleteDeliveryIntegrationUsecase({ deliveryIntegrationService: mockService });
	});

	test("should throw when service is missing", () => {
		expect(() => new DeleteDeliveryIntegrationUsecase()).toThrow(
			"DELIVERYINTEGRATION_USECASE.MISSING_SERVICE"
		);
	});

	test("should throw when id is invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion failed", async () => {
		mockService.deleteDeliveryIntegration.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(
			new ValidationError("Delivery integration not found")
		);
	});

	test("should delete delivery integration", async () => {
		mockService.deleteDeliveryIntegration.mockResolvedValue(true);

		const result = await usecase.execute("3");

		expect(mockService.deleteDeliveryIntegration).toHaveBeenCalledWith(3);
		expect(result).toBe(true);
	});
});
