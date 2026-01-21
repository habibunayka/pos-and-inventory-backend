import { describe, expect, it } from "@jest/globals";
import PackageService from "../PackageService.js";
import PackageRepository from "../../../../Domains/Packages/Repositories/PackageRepository.js";

describe("PackageService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new PackageRepository();
		const service = new PackageService({ packageRepository: repo });
		expect(service).toBeInstanceOf(PackageService);
	});
});
