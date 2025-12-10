import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../Commons/Errors/ValidationError.js";
import OpenCashierShiftUsecase from "../Stocks/UseCases/cashierShifts/OpenCashierShiftUsecase.js";
import CreateTableUsecase from "../Tables/UseCases/CreateTableUsecase.js";
import CreateDeliveryIntegrationUsecase from "../DeliveryIntegrations/UseCases/CreateDeliveryIntegrationUsecase.js";
import CreateSystemLogUsecase from "../Logs/UseCases/CreateSystemLogUsecase.js";
import CreateInventoryStockDailyUsecase from "../Stocks/UseCases/inventoryStockDaily/CreateInventoryStockDailyUsecase.js";
import CreatePackageUsecase from "../Packages/UseCases/CreatePackageUsecase.js";
import CreateShiftUsecase from "../Shifts/UseCases/CreateShiftUsecase.js";
import CreateStationUsecase from "../Stations/UseCases/CreateStationUsecase.js";
import CreateMenuVariantItemUsecase from "../MenuVariantItems/UseCases/CreateMenuVariantItemUsecase.js";
import CreatePromotionRuleUsecase from "../Promotions/UseCases/promotionRules/CreatePromotionRuleUsecase.js";
import CreatePermissionUsecase from "../Permissions/UseCases/CreatePermissionUsecase.js";
import UpdateStationUsecase from "../Stations/UseCases/UpdateStationUsecase.js";
import CreateCashierShiftUsecase from "../Stocks/UseCases/cashierShifts/CreateCashierShiftUsecase.js";
import CreateIngredientUsecase from "../Ingredients/UseCases/CreateIngredientUsecase.js";
import CreateMenuPriceUsecase from "../MenuPrices/UseCases/CreateMenuPriceUsecase.js";
import CreateMenuVariantUsecase from "../MenuVariants/UseCases/CreateMenuVariantUsecase.js";
import CreatePaymentMethodUsecase from "../PaymentMethods/UseCases/CreatePaymentMethodUsecase.js";
import UpdatePlaceUsecase from "../Places/UseCases/UpdatePlaceUsecase.js";
import CreateRecipeUsecase from "../Recipes/UseCases/CreateRecipeUsecase.js";
import UpdateTransactionItemUsecase from "../Transactions/UseCases/transactionItems/UpdateTransactionItemUsecase.js";
import CreatePlaceStockUsecase from "../Stocks/UseCases/placeStocks/CreatePlaceStockUsecase.js";
import UpdateTableUsecase from "../Tables/UseCases/UpdateTableUsecase.js";
import CreateKitchenOrderUsecase from "../Transactions/UseCases/kitchenOrders/CreateKitchenOrderUsecase.js";
import CreateSupplierProductUsecase from "../Suppliers/UseCases/CreateSupplierProductUsecase.js";
import CreateUnitUsecase from "../Units/UseCases/CreateUnitUsecase.js";
import UpdatePaymentMethodUsecase from "../PaymentMethods/UseCases/UpdatePaymentMethodUsecase.js";
import CreatePlaceUsecase from "../Places/UseCases/CreatePlaceUsecase.js";
import CreateReportFileUsecase from "../ReportFiles/UseCases/CreateReportFileUsecase.js";
import CreateActivityLogUsecase from "../Logs/UseCases/CreateActivityLogUsecase.js";
import { assertValidSystemRole, isValidSystemRole } from "../../Commons/Constants/SystemRoles.js";

describe("default branch coverage helpers", () => {
	it("OpenCashierShiftUsecase uses default payload validation", async () => {
		const usecase = new OpenCashierShiftUsecase({ cashierShiftService: { create: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateTableUsecase covers null status and place validation failure", async () => {
		const usecase = new CreateTableUsecase({
			tableService: { createTable: jest.fn() },
			placeService: { supportsPlaceValidation: true, getPlace: jest.fn().mockResolvedValue(null) }
		});
		await expect(usecase.execute({ placeId: 1, name: "Name" })).rejects.toThrow(ValidationError);
	});

	it("CreateDeliveryIntegrationUsecase defaults optional fields when omitted", async () => {
		const service = { createDeliveryIntegration: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateDeliveryIntegrationUsecase({ deliveryIntegrationService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ placeId: 1, platformName: "Go" });
		expect(service.createDeliveryIntegration).toHaveBeenLastCalledWith({ placeId: 1, platformName: "Go" });
	});

	it("CreateSystemLogUsecase skips optional fields", async () => {
		const systemLogService = { createSystemLog: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateSystemLogUsecase({ systemLogService });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ message: "ok" });
		expect(systemLogService.createSystemLog).toHaveBeenCalledWith({ message: "ok" });
	});

	it("CreateInventoryStockDailyUsecase defaults date and qty values", async () => {
		const service = { create: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateInventoryStockDailyUsecase({ inventoryStockDailyService: service });
		await usecase.execute();
		await usecase.execute({ placeId: 1, ingredientId: 2 });
		expect(service.create).toHaveBeenCalledWith({
			placeId: 1,
			ingredientId: 2,
			date: expect.any(Date),
			openingQty: 0,
			closingQty: 0,
			diffQty: null
		});
	});

	it("CreatePackageUsecase handles empty description", async () => {
		const service = { getPackageByName: jest.fn().mockResolvedValue(null), createPackage: jest.fn() };
		const usecase = new CreatePackageUsecase({ packageService: service });
		await usecase.execute({ name: "Box", description: "   " });
		expect(service.createPackage).toHaveBeenCalledWith({ name: "box", description: null });
	});

	it("CreateShiftUsecase default arg branch throws", async () => {
		const usecase = new CreateShiftUsecase({ shiftService: { createShift: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateStationUsecase default arg branch throws", async () => {
		const usecase = new CreateStationUsecase({ stationService: { createStation: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateMenuVariantItemUsecase defaults additionalPrice to zero", async () => {
		const service = { createMenuVariantItem: jest.fn().mockResolvedValue({}) };
		const usecase = new CreateMenuVariantItemUsecase({ menuVariantItemService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ menuVariantId: 1, name: "Size" });
		expect(service.createMenuVariantItem).toHaveBeenCalledWith({
			menuVariantId: 1,
			name: "Size",
			additionalPrice: 0
		});
	});

	it("CreatePromotionRuleUsecase skips optional props", async () => {
		const service = { createPromotionRule: jest.fn().mockResolvedValue({}) };
		const usecase = new CreatePromotionRuleUsecase({ promotionRuleService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
		await usecase.execute({ promotionId: 1, name: "rule" });
		expect(service.createPromotionRule).toHaveBeenCalledWith({ promotionId: 1, name: "rule" });
	});

	it("CreatePermissionUsecase default arg branch", async () => {
		const service = { getPermissionByName: jest.fn().mockResolvedValue(null), createPermission: jest.fn() };
		const usecase = new CreatePermissionUsecase({ permissionService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdateStationUsecase guards empty payload", async () => {
		const service = { getStation: jest.fn().mockResolvedValue({ id: 1 }), updateStation: jest.fn() };
		const usecase = new UpdateStationUsecase({ stationService: service });
		await expect(usecase.execute(1, {})).rejects.toThrow(ValidationError);
	});

	it("CreateCashierShiftUsecase default arg branch", async () => {
		const usecase = new CreateCashierShiftUsecase({ cashierShiftService: { create: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateIngredientUsecase default arg branch", async () => {
		const service = { getIngredientByName: jest.fn().mockResolvedValue(null), createIngredient: jest.fn() };
		const usecase = new CreateIngredientUsecase({ ingredientService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateMenuPriceUsecase default arg branch", async () => {
		const usecase = new CreateMenuPriceUsecase({ menuPriceService: { createMenuPrice: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateMenuVariantUsecase default arg branch", async () => {
		const usecase = new CreateMenuVariantUsecase({ menuVariantService: { createMenuVariant: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreatePaymentMethodUsecase default arg branch", async () => {
		const service = { getPaymentMethodByName: jest.fn().mockResolvedValue(null), createPaymentMethod: jest.fn() };
		const usecase = new CreatePaymentMethodUsecase({ paymentMethodService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdatePlaceUsecase default payload branch", async () => {
		const usecase = new UpdatePlaceUsecase({ placeService: { updatePlace: jest.fn().mockResolvedValue({}) } });
		await expect(usecase.execute(1, {})).rejects.toThrow(ValidationError);
	});

	it("CreateRecipeUsecase default arg branch", async () => {
		const usecase = new CreateRecipeUsecase({ recipeService: { createRecipe: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdateTransactionItemUsecase handles missing payload", async () => {
		const service = { updateTransactionItem: jest.fn().mockResolvedValue({ id: 1 }) };
		const usecase = new UpdateTransactionItemUsecase({ transactionItemService: service });
		await expect(usecase.execute(1, null)).rejects.toThrow(ValidationError);
	});

	it("CreatePlaceStockUsecase default arg branch", async () => {
		const usecase = new CreatePlaceStockUsecase({ placeStockService: { createPlaceStock: jest.fn() } });
		await usecase.execute();
	});

	it("UpdateTableUsecase guards empty updates", async () => {
		const service = { getTable: jest.fn().mockResolvedValue({ id: 1 }), updateTable: jest.fn() };
		const usecase = new UpdateTableUsecase({ tableService: service });
		await expect(usecase.execute(1, {})).rejects.toThrow(ValidationError);
	});

	it("CreateKitchenOrderUsecase default arg branch", async () => {
		const usecase = new CreateKitchenOrderUsecase({ kitchenOrderService: { createKitchenOrder: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateSupplierProductUsecase default arg branch", async () => {
		const usecase = new CreateSupplierProductUsecase({
			supplierService: null,
			ingredientService: null,
			packageService: null,
			supplierProductService: {}
		});
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateUnitUsecase default arg branch", async () => {
		const usecase = new CreateUnitUsecase({ unitService: { getUnitByName: jest.fn(), createUnit: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdatePaymentMethodUsecase default arg branch", async () => {
		const service = { getPaymentMethod: jest.fn().mockResolvedValue({ id: 1 }), updatePaymentMethod: jest.fn() };
		const usecase = new UpdatePaymentMethodUsecase({ paymentMethodService: service });
		await expect(usecase.execute(1, {})).rejects.toThrow(ValidationError);
	});

	it("CreatePlaceUsecase default arg branch", async () => {
		const usecase = new CreatePlaceUsecase({ placeService: { createPlace: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateReportFileUsecase default arg branch", async () => {
		const usecase = new CreateReportFileUsecase({ reportFileService: { createReportFile: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("CreateActivityLogUsecase default arg branch", async () => {
		const usecase = new CreateActivityLogUsecase({ activityLogService: { createActivityLog: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("SystemRoles handles undefined values", () => {
		expect(isValidSystemRole()).toBe(false);
		expect(() => assertValidSystemRole()).toThrow("Invalid system role: <empty>");
	});
});
