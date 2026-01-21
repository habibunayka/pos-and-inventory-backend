import { describe, expect, it } from "@jest/globals";
import MenuVariantService from "../MenuVariantService.js";
import MenuVariantRepository from "../../../../Domains/MenuVariants/Repositories/MenuVariantRepository.js";

describe("MenuVariantService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new MenuVariantRepository();
		const service = new MenuVariantService({ menuVariantRepository: repo });
		expect(service).toBeInstanceOf(MenuVariantService);
	});
});
