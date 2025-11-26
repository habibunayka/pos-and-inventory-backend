import { jest } from "@jest/globals";
import CloseCashierShiftUsecase from "../CloseCashierShiftUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CloseCashierShiftUsecase", () => {
	let cashierShiftService;
	let usecase;

	beforeEach(() => {
		cashierShiftService = {
			get: jest.fn(),
			update: jest.fn()
		};
		usecase = new CloseCashierShiftUsecase({ cashierShiftService });
	});

	test("should throw when service is missing", () => {
		expect(() => new CloseCashierShiftUsecase()).toThrow("CASHIER_SHIFT_USECASE.MISSING_SERVICE");
	});

	test("should throw when shift not found", async () => {
		cashierShiftService.get.mockResolvedValue(null);

		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("Cashier shift not found"));
	});

	test("should throw when shift already closed", async () => {
		cashierShiftService.get.mockResolvedValue({ id: 1, status: "closed", closedAt: new Date() });

		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("Cashier shift already closed"));
	});

	test("should close shift with provided payload", async () => {
		const existing = { id: 5, status: "open", closedAt: null };
		cashierShiftService.get.mockResolvedValue(existing);
		const updated = { ...existing, status: "closed" };
		cashierShiftService.update.mockResolvedValue(updated);

		const payload = {
			closedAt: "2024-01-01T00:00:00.000Z",
			closingBalance: "1000",
			systemBalance: 900
		};

		const result = await usecase.execute(5, payload);

		expect(cashierShiftService.update).toHaveBeenCalledTimes(1);
		const callArgs = cashierShiftService.update.mock.calls[0][0];
		expect(callArgs.id).toBe(5);
		expect(callArgs.data.status).toBe("closed");
		expect(callArgs.data.closedAt.getTime()).toBe(new Date(payload.closedAt).getTime());
		expect(callArgs.data.closingBalance).toBe(1000);
		expect(callArgs.data.systemBalance).toBe(900);
		expect(result).toBe(updated);
	});
});
