import { describe, expect, it } from "@jest/globals";
import MenuService from "../MenuService.js";
import MenuRepository from "../../../../Domains/Menus/Repositories/MenuRepository.js";

describe("MenuService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new MenuRepository();
		const service = new MenuService({ menuRepository: repo });
		expect(service).toBeInstanceOf(MenuService);
	});
});
