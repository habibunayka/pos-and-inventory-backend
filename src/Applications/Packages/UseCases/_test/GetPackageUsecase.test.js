import { jest } from "@jest/globals";
import GetPackageUsecase from "../GetPackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("GetPackageUsecase", () => {
	let packageService;
	let usecase;

	beforeEach(() => {
		packageService = { getPackage: jest.fn() };
		usecase = new GetPackageUsecase({ packageService });
	});

	test("should throw when service missing", () => {
		expect(() => new GetPackageUsecase()).toThrow("PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when package not found", async () => {
		packageService.getPackage.mockResolvedValue(null);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Package not found"));
	});

	test("should return package when found", async () => {
		packageService.getPackage.mockResolvedValue({ id: 2 });

		const result = await usecase.execute("2");

		expect(packageService.getPackage).toHaveBeenCalledWith(2);
		expect(result).toEqual({ id: 2 });
	});
});
