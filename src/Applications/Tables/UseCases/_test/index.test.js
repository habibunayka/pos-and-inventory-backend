import * as usecases from "../index.js";
import ListTablesUsecase from "../ListTablesUsecase.js";
import GetTableUsecase from "../GetTableUsecase.js";
import CreateTableUsecase from "../CreateTableUsecase.js";
import UpdateTableUsecase from "../UpdateTableUsecase.js";
import DeleteTableUsecase from "../DeleteTableUsecase.js";

describe("Tables Usecases index exports", () => {
	test("should export ListTablesUsecase", () => {
		expect(usecases.ListTablesUsecase).toBe(ListTablesUsecase);
	});

	test("should export GetTableUsecase", () => {
		expect(usecases.GetTableUsecase).toBe(GetTableUsecase);
	});

	test("should export CreateTableUsecase", () => {
		expect(usecases.CreateTableUsecase).toBe(CreateTableUsecase);
	});

	test("should export UpdateTableUsecase", () => {
		expect(usecases.UpdateTableUsecase).toBe(UpdateTableUsecase);
	});

	test("should export DeleteTableUsecase", () => {
		expect(usecases.DeleteTableUsecase).toBe(DeleteTableUsecase);
	});
});
