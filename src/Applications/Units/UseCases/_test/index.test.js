import * as usecases from "../index.js";
import ListUnitsUsecase from "../ListUnitsUsecase.js";
import GetUnitUsecase from "../GetUnitUsecase.js";
import CreateUnitUsecase from "../CreateUnitUsecase.js";
import UpdateUnitUsecase from "../UpdateUnitUsecase.js";
import DeleteUnitUsecase from "../DeleteUnitUsecase.js";

describe("Units Usecases index exports", () => {
	test("should export ListUnitsUsecase", () => {
		expect(usecases.ListUnitsUsecase).toBe(ListUnitsUsecase);
	});

	test("should export GetUnitUsecase", () => {
		expect(usecases.GetUnitUsecase).toBe(GetUnitUsecase);
	});

	test("should export CreateUnitUsecase", () => {
		expect(usecases.CreateUnitUsecase).toBe(CreateUnitUsecase);
	});

	test("should export UpdateUnitUsecase", () => {
		expect(usecases.UpdateUnitUsecase).toBe(UpdateUnitUsecase);
	});

	test("should export DeleteUnitUsecase", () => {
		expect(usecases.DeleteUnitUsecase).toBe(DeleteUnitUsecase);
	});
});
