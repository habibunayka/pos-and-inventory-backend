import { describe, expect, it } from "@jest/globals";
import TableService from "../TableService.js";
import TableRepository from "../../../../Domains/Tables/Repositories/TableRepository.js";

describe("TableService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new TableRepository();
		const service = new TableService({ tableRepository: repo });
		expect(service).toBeInstanceOf(TableService);
	});
});
