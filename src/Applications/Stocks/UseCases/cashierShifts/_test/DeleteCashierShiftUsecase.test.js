import { jest } from "@jest/globals";
import DeleteCashierShiftUsecase from "../DeleteCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("DeleteCashierShiftUsecase", () => {
	let cashierShiftService;
	let usecase;

	beforeEach(() => {
		cashierShiftService = { delete: jest.fn() };
		usecase = new DeleteCashierShiftUsecase({ cashierShiftService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeleteCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when delete returns falsy", async () => {
		cashierShiftService.delete.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Cashier shift not found"));
	});

	test("should delete cashier shift", async () => {
		cashierShiftService.delete.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(cashierShiftService.delete).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
