import { describe, expect, it } from "@jest/globals";
import ShiftService from "../ShiftService.js";
import ShiftRepository from "../../../../Domains/Shifts/Repositories/ShiftRepository.js";

describe("ShiftService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new ShiftRepository();
		const service = new ShiftService({ shiftRepository: repo });
		expect(service).toBeInstanceOf(ShiftService);
	});
});
