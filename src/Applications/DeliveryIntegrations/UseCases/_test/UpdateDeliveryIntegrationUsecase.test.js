import { jest } from "@jest/globals";
import UpdateDeliveryIntegrationUsecase from "../UpdateDeliveryIntegrationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdateDeliveryIntegrationUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			updateDeliveryIntegration: jest.fn()
		};
		usecase = new UpdateDeliveryIntegrationUsecase({ deliveryIntegrationService: mockService });
	});

	test("should throw when service is missing", () => {
		expect(() => new UpdateDeliveryIntegrationUsecase()).toThrow("DELIVERYINTEGRATION_USECASE.MISSING_SERVICE");
	});

	test("should throw when id is invalid", async () => {
		await expect(usecase.execute("abc", { platformName: "X" })).rejects.toThrow(
			new ValidationError("id must be a positive integer")
		);
	});

	test("should throw when placeId is invalid", async () => {
		await expect(usecase.execute(1, { placeId: 0 })).rejects.toThrow(
			new ValidationError("placeId must be a positive integer")
		);
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when record is not found", async () => {
		mockService.updateDeliveryIntegration.mockResolvedValue(null);

		await expect(usecase.execute(1, { platformName: " GrabFood " })).rejects.toThrow(
			new ValidationError("Delivery integration not found")
		);
	});

	test("should update delivery integration with normalized payload", async () => {
		const updated = { id: 3, platformName: "GoFood", apiKey: "KEY", settingsJson: null };
		mockService.updateDeliveryIntegration.mockResolvedValue(updated);

		const result = await usecase.execute("3", {
			placeId: "4",
			platformName: " GoFood ",
			apiKey: "KEY",
			settingsJson: null
		});

		expect(mockService.updateDeliveryIntegration).toHaveBeenCalledWith({
			id: 3,
			data: {
				placeId: 4,
				platformName: "GoFood",
				apiKey: "KEY",
				settingsJson: null
			}
		});
		expect(result).toEqual(updated);
	});
});
