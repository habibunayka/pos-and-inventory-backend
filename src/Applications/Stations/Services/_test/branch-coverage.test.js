import { describe, expect, it } from "@jest/globals";
import StationService from "../StationService.js";
import StationRepository from "../../../../Domains/Stations/Repositories/StationRepository.js";

describe("StationService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new StationRepository();
		const service = new StationService({ stationRepository: repo });
		expect(service).toBeInstanceOf(StationService);
	});
});
