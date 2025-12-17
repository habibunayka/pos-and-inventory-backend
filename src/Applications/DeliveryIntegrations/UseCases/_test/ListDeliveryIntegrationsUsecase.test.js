import { jest } from "@jest/globals";
import ListDeliveryIntegrationsUsecase from "../ListDeliveryIntegrationsUsecase.js";

describe("ListDeliveryIntegrationsUsecase", () => {
	let mockService;
	let usecase;

	beforeEach(() => {
		mockService = {
			listDeliveryIntegrations: jest.fn()
		};
		usecase = new ListDeliveryIntegrationsUsecase({ deliveryIntegrationService: mockService });
	});

	test("should throw when service is missing", () => {
		expect(() => new ListDeliveryIntegrationsUsecase()).toThrow("DELIVERYINTEGRATION_USECASE.MISSING_SERVICE");
	});

	test("should list delivery integrations", async () => {
		const records = [{ id: 1 }, { id: 2 }];
		mockService.listDeliveryIntegrations.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(mockService.listDeliveryIntegrations).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
