import { describe, expect, it } from "@jest/globals";
import MenuVariantItemService from "../MenuVariantItemService.js";
import MenuVariantItemRepository from "../../../../Domains/MenuVariantItems/Repositories/MenuVariantItemRepository.js";

describe("MenuVariantItemService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new MenuVariantItemRepository();
		const service = new MenuVariantItemService({ menuVariantItemRepository: repo });
		expect(service).toBeInstanceOf(MenuVariantItemService);
	});
});
