import { describe, expect, it } from "@jest/globals";
import UnitService from "../UnitService.js";
import UnitRepository from "../../../../Domains/Units/Repositories/UnitRepository.js";

describe("UnitService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new UnitRepository();
		const service = new UnitService({ unitRepository: repo });
		expect(service).toBeInstanceOf(UnitService);
	});
});
