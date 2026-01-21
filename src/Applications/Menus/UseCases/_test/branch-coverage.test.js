import { describe, expect, jest, test } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateMenuUsecase from "../CreateMenuUsecase.js";
import UpdateMenuUsecase from "../UpdateMenuUsecase.js";

describe("Menus usecase branch coverage", () => {
	test("CreateMenuUsecase default arg and nullish name handling", async () => {
		const menuService = { createMenu: jest.fn() };
		const usecase = new CreateMenuUsecase({ menuService });

		await expect(usecase.execute()).rejects.toThrow("name is required");
	});

	test("UpdateMenuUsecase default arg branch", async () => {
		const menuService = { updateMenu: jest.fn() };
		const usecase = new UpdateMenuUsecase({ menuService });

		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
