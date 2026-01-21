import { describe, expect, it } from "@jest/globals";
import KitchenOrderService from "../KitchenOrderService.js";
import TransactionItemService from "../TransactionItemService.js";
import TransactionItemVariantService from "../TransactionItemVariantService.js";
import TransactionService from "../TransactionService.js";
import KitchenOrderRepository from "../../../../Domains/Transactions/Repositories/KitchenOrderRepository.js";
import TransactionItemRepository from "../../../../Domains/Transactions/Repositories/TransactionItemRepository.js";
import TransactionItemVariantRepository from "../../../../Domains/Transactions/Repositories/TransactionItemVariantRepository.js";
import TransactionRepository from "../../../../Domains/Transactions/Repositories/TransactionRepository.js";

describe("Transactions services constructor coverage", () => {
	const cases = [
		{ Service: KitchenOrderService, Repo: KitchenOrderRepository, key: "kitchenOrderRepository" },
		{ Service: TransactionItemService, Repo: TransactionItemRepository, key: "transactionItemRepository" },
		{
			Service: TransactionItemVariantService,
			Repo: TransactionItemVariantRepository,
			key: "transactionItemVariantRepository"
		},
		{ Service: TransactionService, Repo: TransactionRepository, key: "transactionRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
