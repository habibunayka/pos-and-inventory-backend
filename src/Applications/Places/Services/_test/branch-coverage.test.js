import { describe, expect, it } from "@jest/globals";
import PlaceService from "../PlaceService.js";
import PlaceRepository from "../../../../Domains/Places/Repositories/PlaceRepository.js";

describe("PlaceService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new PlaceRepository();
		const service = new PlaceService({ placeRepository: repo });
		expect(service).toBeInstanceOf(PlaceService);
	});
});
