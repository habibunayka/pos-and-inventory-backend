import { jest } from "@jest/globals";
import CreateWasteUsecase from "../CreateWasteUsecase.js";
import ValidationError from "../../../../../Commons/Errors/ValidationError.js";

describe("CreateWasteUsecase", () => {
	let wasteService;
	let usecase;

	beforeEach(() => {
		wasteService = { createWaste: jest.fn() };
		usecase = new CreateWasteUsecase({ wasteService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreateWasteUsecase()).toThrow("CREATE_WASTE.MISSING_SERVICE");
	});

	test("should throw when payload not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when ingredientId invalid", async () => {
		await expect(usecase.execute({ ingredientId: "abc", qty: 1 })).rejects.toThrow(
			new ValidationError("ingredientId must be a positive integer")
		);
	});

	test("should throw when qty invalid", async () => {
		await expect(usecase.execute({ ingredientId: 1, qty: "abc" })).rejects.toThrow(
			new ValidationError("qty must be a number")
		);
	});

	test("should create waste with normalized payload", async () => {
		const created = { id: 1 };
		wasteService.createWaste.mockResolvedValue(created);

		const result = await usecase.execute({
			ingredientId: "2",
			qty: "3",
			unitId: "4",
			reason: "  expired "
		});

		expect(wasteService.createWaste).toHaveBeenCalledWith({
			ingredientId: 2,
			qty: 3,
			unitId: 4,
			reason: "expired"
		});
		expect(result).toEqual(created);
	});
});
