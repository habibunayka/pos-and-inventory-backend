import { describe, expect, it } from "@jest/globals";
import CashierShiftService from "../CashierShiftService.js";
import InventoryStockDailyService from "../InventoryStockDailyService.js";
import PlaceStockService from "../PlaceStockService.js";
import StockTransferService from "../StockTransferService.js";
import WasteService from "../WasteService.js";
import CashierShiftRepository from "../../../../Domains/CashierShifts/Repositories/CashierShiftRepository.js";
import InventoryStockDailyRepository from "../../../../Domains/Stocks/Repositories/InventoryStockDailyRepository.js";
import PlaceStockRepository from "../../../../Domains/Stocks/Repositories/PlaceStockRepository.js";
import StockTransferRepository from "../../../../Domains/Stocks/Repositories/StockTransferRepository.js";
import WasteRepository from "../../../../Domains/Stocks/Repositories/WasteRepository.js";

describe("Stocks services constructor coverage", () => {
	const cases = [
		{ Service: CashierShiftService, Repo: CashierShiftRepository, key: "cashierShiftRepository" },
		{
			Service: InventoryStockDailyService,
			Repo: InventoryStockDailyRepository,
			key: "inventoryStockDailyRepository"
		},
		{ Service: PlaceStockService, Repo: PlaceStockRepository, key: "placeStockRepository" },
		{ Service: StockTransferService, Repo: StockTransferRepository, key: "stockTransferRepository" },
		{ Service: WasteService, Repo: WasteRepository, key: "wasteRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
