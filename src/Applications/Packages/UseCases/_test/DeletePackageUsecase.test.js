import { jest } from "@jest/globals";
import DeletePackageUsecase from "../DeletePackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("DeletePackageUsecase", () => {
	let packageService;
	let usecase;

	beforeEach(() => {
		packageService = { deletePackage: jest.fn() };
		usecase = new DeletePackageUsecase({ packageService });
	});

	test("should throw when service missing", () => {
		expect(() => new DeletePackageUsecase()).toThrow("PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc")).rejects.toThrow(new ValidationError("id must be a positive integer"));
	});

	test("should throw when deletion fails", async () => {
		packageService.deletePackage.mockResolvedValue(false);

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("Package not found"));
	});

	test("should delete package", async () => {
		packageService.deletePackage.mockResolvedValue(true);

		const result = await usecase.execute("2");

		expect(packageService.deletePackage).toHaveBeenCalledWith(2);
		expect(result).toBe(true);
	});
});
