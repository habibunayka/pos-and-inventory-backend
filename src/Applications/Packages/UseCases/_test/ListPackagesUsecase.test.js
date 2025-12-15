import { jest } from "@jest/globals";
import ListPackagesUsecase from "../ListPackagesUsecase.js";

describe("ListPackagesUsecase", () => {
	let packageService;
	let usecase;

	beforeEach(() => {
		packageService = { listPackages: jest.fn() };
		usecase = new ListPackagesUsecase({ packageService });
	});

	test("should throw when service missing", () => {
		expect(() => new ListPackagesUsecase()).toThrow("PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should list packages", async () => {
		const records = [{ id: 1 }];
		packageService.listPackages.mockResolvedValue(records);

		const result = await usecase.execute();

		expect(packageService.listPackages).toHaveBeenCalledTimes(1);
		expect(result).toEqual(records);
	});
});
