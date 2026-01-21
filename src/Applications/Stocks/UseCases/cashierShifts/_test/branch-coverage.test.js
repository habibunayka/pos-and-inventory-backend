import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";
import BaseCashierShiftUsecase from "../BaseCashierShiftUsecase.js";
import CloseCashierShiftUsecase from "../CloseCashierShiftUsecase.js";
import OpenCashierShiftUsecase from "../OpenCashierShiftUsecase.js";
import UpdateCashierShiftUsecase from "../UpdateCashierShiftUsecase.js";

describe("Cashier shift usecase branch coverage", () => {
	class TestCashierShiftUsecase extends BaseCashierShiftUsecase {
		constructor() {
			super({ cashierShiftService: {} });
		}
	}

	it("BaseCashierShiftUsecase uses default fieldName", () => {
		const usecase = new TestCashierShiftUsecase();
		expect(usecase._validateId("7")).toBe(7);
	});

	it("CloseCashierShiftUsecase accepts open shifts", async () => {
		const cashierShiftService = {
			get: jest.fn().mockResolvedValue({ id: 1, status: "open", closedAt: null }),
			update: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new CloseCashierShiftUsecase({ cashierShiftService });
		await usecase.execute(1, {});
		expect(cashierShiftService.update).toHaveBeenCalledWith({
			id: 1,
			data: expect.objectContaining({ status: "closed" })
		});
	});

	it("OpenCashierShiftUsecase requires ipAddress", async () => {
		const usecase = new OpenCashierShiftUsecase({ cashierShiftService: { create: jest.fn() } });
		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3 }, { user: { id: 1 } })
		).rejects.toThrow(new ValidationError("ipAddress is required"));
	});

	it("UpdateCashierShiftUsecase validates status and defaults", async () => {
		const cashierShiftService = {
			get: jest.fn().mockResolvedValue({ id: 1, placeId: 1, stationId: 2, shiftId: 3 }),
			update: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdateCashierShiftUsecase({ cashierShiftService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await expect(usecase.execute(1, { status: null })).rejects.toThrow(
			new ValidationError("status cannot be empty when provided")
		);
	});
});
