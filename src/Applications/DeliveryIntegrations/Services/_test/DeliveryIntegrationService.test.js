import { jest } from "@jest/globals";
import DeliveryIntegrationService from "../DeliveryIntegrationService.js";

describe("DeliveryIntegrationService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createDeliveryIntegration: jest.fn(),
			updateDeliveryIntegration: jest.fn(),
			deleteDeliveryIntegration: jest.fn()
		};
	});

	test("should throw when repository is missing", () => {
		expect(() => new DeliveryIntegrationService()).toThrow("DELIVERYINTEGRATION_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository is missing required methods", () => {
		const badRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createDeliveryIntegration: jest.fn(),
			updateDeliveryIntegration: jest.fn()
		};

		expect(() => new DeliveryIntegrationService({ deliveryIntegrationRepository: badRepo })).toThrow(
			"DELIVERYINTEGRATION_SERVICE.INVALID_REPOSITORY: missing deleteDeliveryIntegration"
		);
	});

	test("should store repository when valid", () => {
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: mockRepo });

		expect(service._repo).toBe(mockRepo);
	});

	test("listDeliveryIntegrations should call repo.findAll", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: mockRepo });

		const result = service.listDeliveryIntegrations();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getDeliveryIntegration should call repo.findById", async () => {
		mockRepo.findById.mockResolvedValue({ id: 10 });
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: mockRepo });

		const result = service.getDeliveryIntegration(10);

		expect(mockRepo.findById).toHaveBeenCalledWith(10);
		await expect(result).resolves.toEqual({ id: 10 });
	});

	test("createDeliveryIntegration should call repo.createDeliveryIntegration", async () => {
		const payload = { placeId: 1, platformName: "gofood" };
		mockRepo.createDeliveryIntegration.mockResolvedValue({ id: 5, ...payload });
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: mockRepo });

		const result = service.createDeliveryIntegration(payload);

		expect(mockRepo.createDeliveryIntegration).toHaveBeenCalledWith(payload);
		await expect(result).resolves.toEqual({ id: 5, ...payload });
	});

	test("updateDeliveryIntegration should call repo.updateDeliveryIntegration", async () => {
		const payload = { id: 1, data: { platformName: "grabfood" } };
		mockRepo.updateDeliveryIntegration.mockResolvedValue({ id: 1, ...payload.data });
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: mockRepo });

		const result = service.updateDeliveryIntegration(payload);

		expect(mockRepo.updateDeliveryIntegration).toHaveBeenCalledWith(payload);
		await expect(result).resolves.toEqual({ id: 1, ...payload.data });
	});

	test("deleteDeliveryIntegration should call repo.deleteDeliveryIntegration", async () => {
		mockRepo.deleteDeliveryIntegration.mockResolvedValue(true);
		const service = new DeliveryIntegrationService({ deliveryIntegrationRepository: mockRepo });

		const result = service.deleteDeliveryIntegration(1);

		expect(mockRepo.deleteDeliveryIntegration).toHaveBeenCalledWith(1);
		await expect(result).resolves.toBe(true);
	});
});
