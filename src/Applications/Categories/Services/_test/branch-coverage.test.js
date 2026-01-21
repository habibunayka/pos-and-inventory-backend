import { describe, expect, it } from "@jest/globals";
import CategoryService from "../CategoryService.js";
import CategoryRepository from "../../../../Domains/Categories/Repositories/CategoryRepository.js";

describe("CategoryService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new CategoryRepository();
		const service = new CategoryService({ categoryRepository: repo });
		expect(service).toBeInstanceOf(CategoryService);
	});
});
