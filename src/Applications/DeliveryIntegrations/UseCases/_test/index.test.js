import * as usecases from "../index.js";
import ListDeliveryIntegrationsUsecase from "../ListDeliveryIntegrationsUsecase.js";
import GetDeliveryIntegrationUsecase from "../GetDeliveryIntegrationUsecase.js";
import CreateDeliveryIntegrationUsecase from "../CreateDeliveryIntegrationUsecase.js";
import UpdateDeliveryIntegrationUsecase from "../UpdateDeliveryIntegrationUsecase.js";
import DeleteDeliveryIntegrationUsecase from "../DeleteDeliveryIntegrationUsecase.js";

describe("DeliveryIntegrations Usecases index exports", () => {
	test("should export ListDeliveryIntegrationsUsecase", () => {
		expect(usecases.ListDeliveryIntegrationsUsecase).toBe(ListDeliveryIntegrationsUsecase);
	});

	test("should export GetDeliveryIntegrationUsecase", () => {
		expect(usecases.GetDeliveryIntegrationUsecase).toBe(GetDeliveryIntegrationUsecase);
	});

	test("should export CreateDeliveryIntegrationUsecase", () => {
		expect(usecases.CreateDeliveryIntegrationUsecase).toBe(CreateDeliveryIntegrationUsecase);
	});

	test("should export UpdateDeliveryIntegrationUsecase", () => {
		expect(usecases.UpdateDeliveryIntegrationUsecase).toBe(UpdateDeliveryIntegrationUsecase);
	});

	test("should export DeleteDeliveryIntegrationUsecase", () => {
		expect(usecases.DeleteDeliveryIntegrationUsecase).toBe(DeleteDeliveryIntegrationUsecase);
	});
});
