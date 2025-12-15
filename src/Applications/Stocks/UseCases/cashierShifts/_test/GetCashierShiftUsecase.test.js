import { jest } from "@jest/globals";
import GetCashierShiftUsecase from "../GetCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("GetCashierShiftUsecase", () => {
	let cashierShiftService;
	let usecase;

	beforeEach(() => {
		cashierShiftService = { get: jest.fn() };
		usecase = new GetCashierShiftUsecase({ cashierShiftService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when record not found", async () => {
		cashierShiftService.get.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Cashier shift not found"));
	});

	test("should return record when found", async () => {
		cashierShiftService.get.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(cashierShiftService.get).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
