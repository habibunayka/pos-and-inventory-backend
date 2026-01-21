import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreatePackageUsecase from "../CreatePackageUsecase.js";
import BasePackageUsecase from "../BasePackageUsecase.js";
import UpdatePackageUsecase from "../UpdatePackageUsecase.js";

describe("Packages usecase branch coverage", () => {
	class TestPackageUsecase extends BasePackageUsecase {
		constructor() {
			super({ packageService: { getPackageByName: jest.fn() } });
		}
	}

	it("BasePackageUsecase normalizes null names", () => {
		const usecase = new TestPackageUsecase();
		expect(usecase._normalize(null)).toBe("");
	});

	it("CreatePackageUsecase handles empty description", async () => {
		const service = { getPackageByName: jest.fn().mockResolvedValue(null), createPackage: jest.fn() };
		const usecase = new CreatePackageUsecase({ packageService: service });
		await usecase.execute({ name: "Box", description: "   " });
		expect(service.createPackage).toHaveBeenCalledWith({ name: "box", description: null });
	});

	it("UpdatePackageUsecase handles defaults and descriptions", async () => {
		const service = {
			getPackageByName: jest.fn().mockResolvedValue(null),
			updatePackage: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdatePackageUsecase({ packageService: service });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await usecase.execute(1, { description: "   " });
		expect(service.updatePackage).toHaveBeenCalledWith({ id: 1, data: { description: null } });
	});
});
