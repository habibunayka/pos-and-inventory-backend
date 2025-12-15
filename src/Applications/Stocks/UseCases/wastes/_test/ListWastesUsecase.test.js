import { jest } from "@jest/globals";
import ListWastesUsecase from "../ListWastesUsecase.js";

describe("ListWastesUsecase", () => {
	let wasteService;
	let usecase;

	beforeEach(() => {
		wasteService = { listWastes: jest.fn() };
		usecase = new ListWastesUsecase({ wasteService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListWastesUsecase()).toThrow("LIST_WASTE.MISSING_SERVICE");
	});

	test("should list wastes", async () => {
		const records = [{ id: 1 }];
		wasteService.listWastes.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(wasteService.listWastes).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
