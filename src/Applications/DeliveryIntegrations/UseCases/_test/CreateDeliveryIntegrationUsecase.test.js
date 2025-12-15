import { jest } from "@jest/globals";
import CreateDeliveryIntegrationUsecase from "../CreateDeliveryIntegrationUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreateDeliveryIntegrationUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			createDeliveryIntegration: jest.fn()
		};
		usecase = new CreateDeliveryIntegrationUsecase({ deliveryIntegrationService: mockService });
	});

	test("should throw when service is missing", () => {
		expect(() => new CreateDeliveryIntegrationUsecase()).toThrow(
			"DELIVERYINTEGRATION_USECASE.MISSING_SERVICE"
		);
	});

	test("should throw when placeId is invalid", async () => {
		await expect(usecase.execute({ placeId: "abc", platformName: "GoFood" })).rejects.toThrow(
			new ValidationError("placeId must be a positive integer")
		);
	});

	test("should throw when platformName is empty", async () => {
		await expect(usecase.execute({ placeId: 1, platformName: "   " })).rejects.toThrow(
			new ValidationError("platformName is required")
		);
	});

	test("should create delivery integration with normalized data", async () => {
		const payload = {
			placeId: "2",
			platformName: "  GrabFood ",
			apiKey: "KEY",
			settingsJson: { foo: "bar" }
		};
		const created = { id: 10, ...payload, placeId: 2, platformName: "GrabFood" };
		mockService.createDeliveryIntegration.mockResolvedValue(created);

		const result = await usecase.execute(payload);

		expect(mockService.createDeliveryIntegration).toHaveBeenCalledWith({
			placeId: 2,
			platformName: "GrabFood",
			apiKey: "KEY",
			settingsJson: { foo: "bar" }
		});
		expect(result).toEqual(created);
	});

	test("should pass null optional fields", async () => {
		const created = { id: 5, placeId: 1, platformName: "GoFood", apiKey: null, settingsJson: null };
		mockService.createDeliveryIntegration.mockResolvedValue(created);

		const result = await usecase.execute({
			placeId: 1,
			platformName: " GoFood ",
			apiKey: null,
			settingsJson: null
		});

		expect(mockService.createDeliveryIntegration).toHaveBeenCalledWith({
			placeId: 1,
			platformName: "GoFood",
			apiKey: null,
			settingsJson: null
		});
		expect(result).toEqual(created);
	});
});
