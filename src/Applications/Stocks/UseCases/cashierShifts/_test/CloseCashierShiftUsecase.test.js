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

	test("should throw when id invalid or payload not object", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when closedAt invalid and when update returns null", async () => {
		cashierShiftService.get.mockResolvedValue({ id: 8, status: "open", closedAt: null });

		await expect(usecase.execute(8, { closedAt: "bad-date" })).rejects.toThrow(
			new ValidationError("closedAt must be a valid date")
		);

		cashierShiftService.update.mockResolvedValue(null);
		const result = usecase.execute(8, {});
		await expect(result).rejects.toThrow(new ValidationError("Cashier shift not found"));
	});

	test("should default closedAt and skip optional balances", async () => {
		const existing = { id: 9, status: "open", closedAt: null };
		cashierShiftService.get.mockResolvedValue(existing);
		const updated = { id: 9, status: "closed" };
		cashierShiftService.update.mockResolvedValue(updated);

		const result = await usecase.execute(9, { closedAt: null });

		expect(cashierShiftService.update).toHaveBeenCalledWith({
			id: 9,
			data: expect.objectContaining({
				status: "closed",
				closedAt: expect.any(Date)
			})
		});
		expect(result).toEqual(updated);
	});

	test("should treat null optional balances as null", async () => {
		const existing = { id: 12, status: "open", closedAt: null };
		cashierShiftService.get.mockResolvedValue(existing);
		cashierShiftService.update.mockResolvedValue({ id: 12, status: "closed" });

		await usecase.execute(12, { closingBalance: null, systemBalance: null });

		expect(cashierShiftService.update).toHaveBeenCalledWith({
			id: 12,
			data: expect.objectContaining({ closingBalance: null, systemBalance: null })
		});
	});

	test("should validate optional balance fields and accept uppercase closed status", async () => {
		cashierShiftService.get.mockResolvedValue({ id: 10, status: "CLOSED", closedAt: null });

		await expect(usecase.execute(10, {})).rejects.toThrow(new ValidationError("Cashier shift already closed"));

		cashierShiftService.get.mockResolvedValue({ id: 11, status: "open", closedAt: null });
		await expect(usecase.execute(11, { closingBalance: "bad" })).rejects.toThrow(
			new ValidationError("closingBalance must be a number")
		);

		await expect(usecase.execute(11, { systemBalance: "bad" })).rejects.toThrow(
			new ValidationError("systemBalance must be a number")
		);
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
