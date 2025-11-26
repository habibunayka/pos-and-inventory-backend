import { jest } from "@jest/globals";
import ListMenuVariantsUsecase from "../ListMenuVariantsUsecase.js";

describe("ListMenuVariantsUsecase", () => {
	let menuVariantService;
	let usecase;

	beforeEach(() => {
		menuVariantService = { listMenuVariants: jest.fn() };
		usecase = new ListMenuVariantsUsecase({ menuVariantService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListMenuVariantsUsecase()).toThrow("MENUVARIANT_USECASE.MISSING_SERVICE");
	});

	test("should list menu variants", async () => {
		const records = [{ id: 1 }];
		menuVariantService.listMenuVariants.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(menuVariantService.listMenuVariants).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
