import { jest } from "@jest/globals";
import BaseTableUsecase from "../BaseTableUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BaseTableUsecase {}

describe("BaseTableUsecase", () => {
	test("should throw when service missing", () => {
		expect(() => new BaseTableUsecase()).toThrow("TABLE_USECASE.MISSING_SERVICE");
	});

	test("_validatePlaceId should validate id and call placeService", async () => {
		const placeService = { getPlace: jest.fn().mockResolvedValue({ id: 2 }), supportsPlaceValidation: true };
		const usecase = new DummyUsecase({ tableService: {}, placeService });

		await expect(usecase._validatePlaceId("2")).resolves.toBe(2);
		expect(placeService.getPlace).toHaveBeenCalledWith(2);
	});

	test("_validatePlaceId should throw on invalid id", async () => {
		const usecase = new DummyUsecase({ tableService: {}, placeService: { supportsPlaceValidation: false } });
		await expect(usecase._validatePlaceId("abc")).rejects.toThrow(
			new ValidationError("placeId must be a positive integer")
		);
	});

	test("_validatePlaceId should return id when validation disabled", async () => {
		const usecase = new DummyUsecase({ tableService: {}, placeService: { supportsPlaceValidation: false } });
		await expect(usecase._validatePlaceId("3")).resolves.toBe(3);
	});
});
