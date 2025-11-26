import { jest } from "@jest/globals";
import CreatePackageUsecase from "../CreatePackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

describe("CreatePackageUsecase", () => {
	let packageService;
	let usecase;

	beforeEach(() => {
		packageService = { getPackageByName: jest.fn(), createPackage: jest.fn() };
		usecase = new CreatePackageUsecase({ packageService });
	});

	test("should throw when service missing", () => {
		expect(() => new CreatePackageUsecase()).toThrow("PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("should throw when payload is not object", async () => {
		await expect(usecase.execute(null)).rejects.toThrow(new ValidationError("Payload must be an object"));
	});

	test("should throw when name is empty", async () => {
		await expect(usecase.execute({ name: "   " })).rejects.toThrow(
			new ValidationError("Package name is required")
		);
	});

	test("should throw when package already exists", async () => {
		packageService.getPackageByName.mockResolvedValue({ id: 1, name: "box" });

		await expect(usecase.execute({ name: "Box" })).rejects.toThrow(
			new ValidationError("Package box already exists")
		);
	});

	test("should create package with normalized data", async () => {
		packageService.getPackageByName.mockResolvedValue(null);
		const created = { id: 2, name: "box" };
		packageService.createPackage.mockResolvedValue(created);

		const result = await usecase.execute({ name: " Box ", description: "  desc " });

		expect(packageService.createPackage).toHaveBeenCalledWith({ name: "box", description: "desc" });
		expect(result).toEqual(created);
	});

	test("should pass null description when provided null", async () => {
		packageService.getPackageByName.mockResolvedValue(null);
		packageService.createPackage.mockResolvedValue({ id: 3, name: "bag", description: null });

		await usecase.execute({ name: "bag", description: null });

		expect(packageService.createPackage).toHaveBeenCalledWith({ name: "bag", description: null });
	});
});
