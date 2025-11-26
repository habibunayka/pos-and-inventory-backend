import { jest } from "@jest/globals";
import BasePackageUsecase from "../BasePackageUsecase.js";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";

class DummyUsecase extends BasePackageUsecase {}

describe("BasePackageUsecase", () => {
	let packageService;

	beforeEach(() => {
		packageService = { getPackageByName: jest.fn() };
	});

	test("should throw when service missing", () => {
		expect(() => new BasePackageUsecase()).toThrow("PACKAGE_USECASE.MISSING_SERVICE");
	});

	test("_normalize should trim and lowercase", () => {
		const usecase = new DummyUsecase({ packageService });
		expect(usecase._normalize("  BOX ")).toBe("box");
	});

	test("_assertNameAvailable should throw when name missing", async () => {
		const usecase = new DummyUsecase({ packageService });
		await expect(usecase._assertNameAvailable("  ")).rejects.toThrow(
			new ValidationError("Package name is required")
		);
	});

	test("_assertNameAvailable should throw when name already exists", async () => {
		packageService.getPackageByName.mockResolvedValue({ id: 1, name: "box" });
		const usecase = new DummyUsecase({ packageService });

		await expect(usecase._assertNameAvailable("Box")).rejects.toThrow(
			new ValidationError("Package box already exists")
		);
	});

	test("_assertNameAvailable should allow when same id", async () => {
		packageService.getPackageByName.mockResolvedValue({ id: 2, name: "box" });
		const usecase = new DummyUsecase({ packageService });

		await expect(usecase._assertNameAvailable("Box", 2)).resolves.toBe("box");
	});

	test("_assertNameAvailable should return normalized name when available", async () => {
		packageService.getPackageByName.mockResolvedValue(null);
		const usecase = new DummyUsecase({ packageService });

		await expect(usecase._assertNameAvailable("  Small ")).resolves.toBe("small");
	});
});
