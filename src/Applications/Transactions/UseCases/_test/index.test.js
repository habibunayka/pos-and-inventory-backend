import * as usecases from "../index.js";
import ListTransactionsUsecase from "../transactions/ListTransactionsUsecase.js";
import GetTransactionUsecase from "../transactions/GetTransactionUsecase.js";
import CreateTransactionUsecase from "../transactions/CreateTransactionUsecase.js";
import UpdateTransactionUsecase from "../transactions/UpdateTransactionUsecase.js";
import DeleteTransactionUsecase from "../transactions/DeleteTransactionUsecase.js";
import ListTransactionItemsUsecase from "../transactionItems/ListTransactionItemsUsecase.js";
import GetTransactionItemUsecase from "../transactionItems/GetTransactionItemUsecase.js";
import CreateTransactionItemUsecase from "../transactionItems/CreateTransactionItemUsecase.js";
import UpdateTransactionItemUsecase from "../transactionItems/UpdateTransactionItemUsecase.js";
import DeleteTransactionItemUsecase from "../transactionItems/DeleteTransactionItemUsecase.js";
import ListTransactionItemVariantsUsecase from "../transactionItemVariants/ListTransactionItemVariantsUsecase.js";
import GetTransactionItemVariantUsecase from "../transactionItemVariants/GetTransactionItemVariantUsecase.js";
import CreateTransactionItemVariantUsecase from "../transactionItemVariants/CreateTransactionItemVariantUsecase.js";
import DeleteTransactionItemVariantUsecase from "../transactionItemVariants/DeleteTransactionItemVariantUsecase.js";
import ListKitchenOrdersUsecase from "../kitchenOrders/ListKitchenOrdersUsecase.js";
import GetKitchenOrderUsecase from "../kitchenOrders/GetKitchenOrderUsecase.js";
import CreateKitchenOrderUsecase from "../kitchenOrders/CreateKitchenOrderUsecase.js";
import UpdateKitchenOrderUsecase from "../kitchenOrders/UpdateKitchenOrderUsecase.js";
import DeleteKitchenOrderUsecase from "../kitchenOrders/DeleteKitchenOrderUsecase.js";

describe("Transactions Usecases index exports", () => {
	test("should export transaction CRUD usecases", () => {
		expect(usecases.ListTransactionsUsecase).toBe(ListTransactionsUsecase);
		expect(usecases.GetTransactionUsecase).toBe(GetTransactionUsecase);
		expect(usecases.CreateTransactionUsecase).toBe(CreateTransactionUsecase);
		expect(usecases.UpdateTransactionUsecase).toBe(UpdateTransactionUsecase);
		expect(usecases.DeleteTransactionUsecase).toBe(DeleteTransactionUsecase);
	});

	test("should export transaction item usecases", () => {
		expect(usecases.ListTransactionItemsUsecase).toBe(ListTransactionItemsUsecase);
		expect(usecases.GetTransactionItemUsecase).toBe(GetTransactionItemUsecase);
		expect(usecases.CreateTransactionItemUsecase).toBe(CreateTransactionItemUsecase);
		expect(usecases.UpdateTransactionItemUsecase).toBe(UpdateTransactionItemUsecase);
		expect(usecases.DeleteTransactionItemUsecase).toBe(DeleteTransactionItemUsecase);
	});

	test("should export transaction item variant usecases", () => {
		expect(usecases.ListTransactionItemVariantsUsecase).toBe(ListTransactionItemVariantsUsecase);
		expect(usecases.GetTransactionItemVariantUsecase).toBe(GetTransactionItemVariantUsecase);
		expect(usecases.CreateTransactionItemVariantUsecase).toBe(CreateTransactionItemVariantUsecase);
		expect(usecases.DeleteTransactionItemVariantUsecase).toBe(DeleteTransactionItemVariantUsecase);
	});

	test("should export kitchen order usecases", () => {
		expect(usecases.ListKitchenOrdersUsecase).toBe(ListKitchenOrdersUsecase);
		expect(usecases.GetKitchenOrderUsecase).toBe(GetKitchenOrderUsecase);
		expect(usecases.CreateKitchenOrderUsecase).toBe(CreateKitchenOrderUsecase);
		expect(usecases.UpdateKitchenOrderUsecase).toBe(UpdateKitchenOrderUsecase);
		expect(usecases.DeleteKitchenOrderUsecase).toBe(DeleteKitchenOrderUsecase);
	});
});
