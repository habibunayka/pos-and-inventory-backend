import { jest } from "@jest/globals";
import TableService from "../TableService.js";

describe("TableService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			createTable: jest.fn(),
			updateTable: jest.fn(),
			deleteTable: jest.fn()
		};
	});

	test("should throw when repository missing", () => {
		expect(() => new TableService()).toThrow("TABLE_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new TableService({ tableRepository: badRepo })).toThrow(
			"TABLE_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("listTables should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new TableService({ tableRepository: mockRepo });

		const result = service.listTables();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getTable should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new TableService({ tableRepository: mockRepo });

		const result = service.getTable(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("createTable should delegate to repository", async () => {
		mockRepo.createTable.mockResolvedValue({ id: 3 });
		const service = new TableService({ tableRepository: mockRepo });

		const result = service.createTable({ name: "A" });

		expect(mockRepo.createTable).toHaveBeenCalledWith({ name: "A" });
		await expect(result).resolves.toEqual({ id: 3 });
	});

	test("updateTable should delegate to repository", async () => {
		mockRepo.updateTable.mockResolvedValue({ id: 4 });
		const service = new TableService({ tableRepository: mockRepo });

		const result = service.updateTable({ id: 4, data: { name: "B" } });

		expect(mockRepo.updateTable).toHaveBeenCalledWith({ id: 4, data: { name: "B" } });
		await expect(result).resolves.toEqual({ id: 4 });
	});

	test("deleteTable should delegate to repository", async () => {
		mockRepo.deleteTable.mockResolvedValue(true);
		const service = new TableService({ tableRepository: mockRepo });

		const result = service.deleteTable(5);

		expect(mockRepo.deleteTable).toHaveBeenCalledWith(5);
		await expect(result).resolves.toBe(true);
	});
});
