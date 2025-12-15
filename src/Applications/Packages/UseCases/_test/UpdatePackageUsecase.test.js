import { jest } from "@jest/globals";
import UpdatePackageUsecase from "../UpdatePackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("UpdatePackageUsecase", () => {
	let packageService;
	let usecase;

	beforeEach(() => {
		packageService = { getPackageByName: jest.fn(), updatePackage: jest.fn() };
		usecase = new UpdatePackageUsecase({ packageService });
	});

	test("should throw when service missing", () => {
		expect(() => new UpdatePackageUsecase()).toThrow("PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when id invalid", async () => {
		await expect(usecase.execute("abc", { name: "box" })).rejects.toThrow(
			new ValidationError("id must be a positive integer")
		);
	});

	test("should throw when payload is not an object", async () => {
		await expect(usecase.execute(1, null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when no fields provided", async () => {
		await expect(usecase.execute(1, {})).rejects.toThrow(new ValidationError("No valid fields to update"));
	});

	test("should throw when package not found", async () => {
		packageService.getPackageByName.mockResolvedValue(null);
		packageService.updatePackage.mockResolvedValue(null);

		await expect(usecase.execute(1, { name: "Box" })).rejects.toThrow(
			new ValidationError("Package not found")
		);
	});

	test("should update package with normalized name", async () => {
		packageService.getPackageByName.mockResolvedValue(null);
		const updated = { id: 2, name: "box" };
		packageService.updatePackage.mockResolvedValue(updated);

		const result = await usecase.execute("2", { name: " Box ", description: "  desc " });

		expect(packageService.updatePackage).toHaveBeenCalledWith({
			id: 2,
			data: { name: "box", description: "desc" }
		});
		expect(result).toEqual(updated);
	});

	test("should handle duplicate names and nullable descriptions", async () => {
		packageService.getPackageByName.mockResolvedValue({ id: 3, name: "bag" });
		await expect(usecase.execute(1, { name: "bag" })).rejects.toThrow(
			new ValidationError("Package bag already exists")
		);

		packageService.getPackageByName.mockResolvedValue(null);
		packageService.updatePackage.mockResolvedValue({ id: 5 });
		await usecase.execute(5, { description: "   " });
		expect(packageService.updatePackage).toHaveBeenLastCalledWith({
			id: 5,
			data: { description: null }
		});
	});
});
