import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateMenuVariantUsecase from "../CreateMenuVariantUsecase.js";
import UpdateMenuVariantUsecase from "../UpdateMenuVariantUsecase.js";

describe("MenuVariants usecase branch coverage", () => {
	it("CreateMenuVariantUsecase default arg branch", async () => {
		const usecase = new CreateMenuVariantUsecase({ menuVariantService: { createMenuVariant: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateMenuVariantUsecase handles missing name via nullish fallback", async () => {
		const menuVariantService = { createMenuVariant: jest.fn() };
		const usecase = new CreateMenuVariantUsecase({ menuVariantService });

		await expect(usecase.execute({ menuId: 1 })).rejects.toThrow(new ValidationError("name is required"));
	});

	it("UpdateMenuVariantUsecase default arg branch", async () => {
		const usecase = new UpdateMenuVariantUsecase({ menuVariantService: { updateMenuVariant: jest.fn() } });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
