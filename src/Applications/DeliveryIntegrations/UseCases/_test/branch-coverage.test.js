import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateDeliveryIntegrationUsecase from "../CreateDeliveryIntegrationUsecase.js";
import UpdateDeliveryIntegrationUsecase from "../UpdateDeliveryIntegrationUsecase.js";

describe("DeliveryIntegrations usecase branch coverage", () => {
	it("CreateDeliveryIntegrationUsecase defaults optional fields when omitted", async () => {
		const service = { createDeliveryIntegration: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateDeliveryIntegrationUsecase({ deliveryIntegrationService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ placeId: 1, platformName: "Go" });
		expect(service.createDeliveryIntegration).toHaveBeenLastCalledWith({ placeId: 1, platformName: "Go" });
	});

	it("CreateDeliveryIntegrationUsecase requires platformName", async () => {
		const service = { createDeliveryIntegration: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateDeliveryIntegrationUsecase({ deliveryIntegrationService: service });

		await expect(usecase.execute({ placeId: 1 })).rejects.toThrow(new ValidationError("platformName is required"));
	});

	it("UpdateDeliveryIntegrationUsecase covers default payload and null apiKey", async () => {
		const service = { updateDeliveryIntegration: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateDeliveryIntegrationUsecase({ deliveryIntegrationService: service });

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("No valid fields to update"));

		await usecase.execute(1, { apiKey: null });
		expect(service.updateDeliveryIntegration).toHaveBeenLastCalledWith({ id: 1, data: { apiKey: null } });
	});
});
