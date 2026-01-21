import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateIngredientUsecase from "../CreateIngredientUsecase.js";
import CreateIngredientPackageUsecase from "../CreateIngredientPackageUsecase.js";
import UpdateIngredientUsecase from "../UpdateIngredientUsecase.js";
import UpdateIngredientPackageUsecase from "../UpdateIngredientPackageUsecase.js";

describe("Ingredients usecase branch coverage", () => {
	it("CreateIngredientUsecase default arg branch", async () => {
		const service = { getIngredientByName: jest.fn().mockResolvedValue(null), createIngredient: jest.fn() };
		const usecase = new CreateIngredientUsecase({ ingredientService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateIngredientUsecase rejects empty name", async () => {
		const service = { getIngredientByName: jest.fn().mockResolvedValue(null), createIngredient: jest.fn() };
		const usecase = new CreateIngredientUsecase({ ingredientService: service, unitService: null });

		await expect(usecase.execute({ unitId: 1 })).rejects.toThrow(new ValidationError("name is required"));
	});

	it("CreateIngredientPackageUsecase default arg branch", async () => {
		const service = { createIngredientPackage: jest.fn() };
		const usecase = new CreateIngredientPackageUsecase({ ingredientPackageService: service });

		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdateIngredientUsecase covers default payload and null name", async () => {
		const service = {
			getIngredient: jest.fn().mockResolvedValue({ id: 1 }),
			updateIngredient: jest.fn()
		};
		const usecase = new UpdateIngredientUsecase({ ingredientService: service, unitService: null });

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("No updatable fields provided"));
		await expect(usecase.execute(1, { name: null })).rejects.toThrow(new ValidationError("name cannot be empty"));
	});

	it("UpdateIngredientPackageUsecase default arg branch", async () => {
		const service = {
			getIngredientPackage: jest.fn().mockResolvedValue({ id: 1 }),
			updateIngredientPackage: jest.fn()
		};
		const usecase = new UpdateIngredientPackageUsecase({ ingredientPackageService: service });

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("No updatable fields provided"));
	});
});
