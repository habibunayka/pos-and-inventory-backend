import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateMenuVariantItemUsecase from "../CreateMenuVariantItemUsecase.js";
import UpdateMenuVariantItemUsecase from "../UpdateMenuVariantItemUsecase.js";

describe("MenuVariantItems usecase branch coverage", () => {
	it("CreateMenuVariantItemUsecase defaults additionalPrice to zero", async () => {
		const service = { createMenuVariantItem: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateMenuVariantItemUsecase({ menuVariantItemService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ menuVariantId: 1, name: "Size" });
		expect(service.createMenuVariantItem).toHaveBeenCalledWith({
			menuVariantId: 1,
			name: "Size",
			additionalPrice: 0
		});
	});

	it("CreateMenuVariantItemUsecase requires name", async () => {
		const service = { createMenuVariantItem: jest.fn() };
		const usecase = new CreateMenuVariantItemUsecase({ menuVariantItemService: service });

		await expect(usecase.execute({ menuVariantId: 1 })).rejects.toThrow(new ValidationError("name is required"));
	});

	it("UpdateMenuVariantItemUsecase default arg branch", async () => {
		const usecase = new UpdateMenuVariantItemUsecase({ menuVariantItemService: { updateMenuVariantItem: jest.fn() } });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
