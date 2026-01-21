import { describe, expect, it } from "@jest/globals";
import DeliveryIntegrationService from "../DeliveryIntegrationService.js";
import DeliveryIntegrationRepository from "../../../../Domains/DeliveryIntegrations/Repositories/DeliveryIntegrationRepository.js";

describe("DeliveryIntegrationService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new DeliveryIntegrationRepository();
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: repo });
		expect(service).toBeInstanceOf(DeliveryIntegrationService);
	});
});
