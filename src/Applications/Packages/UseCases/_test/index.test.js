import * as usecases from "../index.js";
import ListPackagesUsecase from "../ListPackagesUsecase.js";
import GetPackageUsecase from "../GetPackageUsecase.js";
import CreatePackageUsecase from "../CreatePackageUsecase.js";
import UpdatePackageUsecase from "../UpdatePackageUsecase.js";
import DeletePackageUsecase from "../DeletePackageUsecase.js";

describe("Packages Usecases index exports", () => {
	test("should export ListPackagesUsecase", () => {
		expect(usecases.ListPackagesUsecase).toBe(ListPackagesUsecase);
	});

	test("should export GetPackageUsecase", () => {
		expect(usecases.GetPackageUsecase).toBe(GetPackageUsecase);
	});

	test("should export CreatePackageUsecase", () => {
		expect(usecases.CreatePackageUsecase).toBe(CreatePackageUsecase);
	});

	test("should export UpdatePackageUsecase", () => {
		expect(usecases.UpdatePackageUsecase).toBe(UpdatePackageUsecase);
	});

	test("should export DeletePackageUsecase", () => {
		expect(usecases.DeletePackageUsecase).toBe(DeletePackageUsecase);
	});
});
