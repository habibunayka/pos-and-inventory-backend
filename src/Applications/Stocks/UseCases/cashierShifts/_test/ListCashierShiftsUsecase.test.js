import { jest } from "@jest/globals";
import ListCashierShiftsUsecase from "../ListCashierShiftsUsecase.js";

describe("ListCashierShiftsUsecase", () => {
	let cashierShiftService;
	let usecase;

	beforeEach(() => {
		cashierShiftService = { list: jest.fn() };
		usecase = new ListCashierShiftsUsecase({ cashierShiftService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListCashierShiftsUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should list cashier shifts", async () => {
		const records = [{ id: 1 }];
		cashierShiftService.list.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(cashierShiftService.list).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
