import { describe, expect, it } from "@jest/globals";
import SupplierProductService from "../SupplierProductService.js";
import SupplierService from "../SupplierService.js";
import SupplierProductRepository from "../../../../Domains/Suppliers/Repositories/SupplierProductRepository.js";
import SupplierRepository from "../../../../Domains/Suppliers/Repositories/SupplierRepository.js";

describe("Suppliers services constructor coverage", () => {
	const cases = [
		{ Service: SupplierProductService, Repo: SupplierProductRepository, key: "supplierProductRepository" },
		{ Service: SupplierService, Repo: SupplierRepository, key: "supplierRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
