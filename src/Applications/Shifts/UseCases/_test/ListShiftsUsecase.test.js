import { jest } from "@jest/globals";
import ListShiftsUsecase from "../ListShiftsUsecase.js";

describe("ListShiftsUsecase", () => {
	let shiftService;
	let usecase;

	beforeEach(() => {
		shiftService = { listShifts: jest.fn() };
		usecase = new ListShiftsUsecase({ shiftService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListShiftsUsecase()).toThrow("SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should list shifts", async () => {
		const records = [{ id: 1 }];
		shiftService.listShifts.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(shiftService.listShifts).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
