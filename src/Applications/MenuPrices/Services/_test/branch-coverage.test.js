import { describe, expect, it } from "@jest/globals";
import MenuPriceService from "../MenuPriceService.js";
import MenuPriceRepository from "../../../../Domains/MenuPrices/Repositories/MenuPriceRepository.js";

describe("MenuPriceService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new MenuPriceRepository();
		const service = new MenuPriceService({ menuPriceRepository: repo });
		expect(service).toBeInstanceOf(MenuPriceService);
	});
});
