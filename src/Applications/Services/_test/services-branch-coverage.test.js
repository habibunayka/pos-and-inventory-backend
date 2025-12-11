import { describe, expect, it } from "@jest/globals";
import ActivityLogService from "../../Logs/Services/ActivityLogService.js";
import CategoryService from "../../Categories/Services/CategoryService.js";
import CashierShiftService from "../../Stocks/Services/CashierShiftService.js";
import DeliveryIntegrationService from "../../DeliveryIntegrations/Services/DeliveryIntegrationService.js";
import IngredientPackageService from "../../Ingredients/Services/IngredientPackageService.js";
import IngredientService from "../../Ingredients/Services/IngredientService.js";
import InventoryStockDailyService from "../../Stocks/Services/InventoryStockDailyService.js";
import KitchenOrderService from "../../Transactions/Services/KitchenOrderService.js";
import MenuPriceService from "../../MenuPrices/Services/MenuPriceService.js";
import MenuService from "../../Menus/Services/MenuService.js";
import MenuVariantItemService from "../../MenuVariantItems/Services/MenuVariantItemService.js";
import MenuVariantService from "../../MenuVariants/Services/MenuVariantService.js";
import PackageService from "../../Packages/Services/PackageService.js";
import PaymentMethodService from "../../PaymentMethods/Services/PaymentMethodService.js";
import PermissionService from "../../Permissions/Services/PermissionService.js";
import PlaceService from "../../Places/Services/PlaceService.js";
import PlaceStockService from "../../Stocks/Services/PlaceStockService.js";
import PromotionRuleService from "../../Promotions/Services/PromotionRuleService.js";
import PromotionService from "../../Promotions/Services/PromotionService.js";
import RecipeService from "../../Recipes/Services/RecipeService.js";
import ReportFileService from "../../ReportFiles/Services/ReportFileService.js";
import RoleService from "../../Roles/Services/RoleService.js";
import ShiftService from "../../Shifts/Services/ShiftService.js";
import StationService from "../../Stations/Services/StationService.js";
import StockTransferService from "../../Stocks/Services/StockTransferService.js";
import SupplierProductService from "../../Suppliers/Services/SupplierProductService.js";
import SupplierService from "../../Suppliers/Services/SupplierService.js";
import SystemLogService from "../../Logs/Services/SystemLogService.js";
import TableService from "../../Tables/Services/TableService.js";
import TransactionItemService from "../../Transactions/Services/TransactionItemService.js";
import TransactionItemVariantService from "../../Transactions/Services/TransactionItemVariantService.js";
import TransactionService from "../../Transactions/Services/TransactionService.js";
import UnitService from "../../Units/Services/UnitService.js";
import UserService from "../../Users/Services/UserService.js";
import WasteService from "../../Stocks/Services/WasteService.js";
import CategoryRepository from "../../../Domains/Categories/Repositories/CategoryRepository.js";
import CashierShiftRepository from "../../../Domains/CashierShifts/Repositories/CashierShiftRepository.js";
import DeliveryIntegrationRepository from "../../../Domains/DeliveryIntegrations/Repositories/DeliveryIntegrationRepository.js";
import IngredientPackageRepository from "../../../Domains/Ingredients/Repositories/IngredientPackageRepository.js";
import IngredientRepository from "../../../Domains/Ingredients/Repositories/IngredientRepository.js";
import InventoryStockDailyRepository from "../../../Domains/Stocks/Repositories/InventoryStockDailyRepository.js";
import KitchenOrderRepository from "../../../Domains/Transactions/Repositories/KitchenOrderRepository.js";
import MenuPriceRepository from "../../../Domains/MenuPrices/Repositories/MenuPriceRepository.js";
import MenuRepository from "../../../Domains/Menus/Repositories/MenuRepository.js";
import MenuVariantItemRepository from "../../../Domains/MenuVariantItems/Repositories/MenuVariantItemRepository.js";
import MenuVariantRepository from "../../../Domains/MenuVariants/Repositories/MenuVariantRepository.js";
import PackageRepository from "../../../Domains/Packages/Repositories/PackageRepository.js";
import PaymentMethodRepository from "../../../Domains/PaymentMethods/Repositories/PaymentMethodRepository.js";
import PermissionRepository from "../../../Domains/Permissions/Repositories/PermissionRepository.js";
import PlaceRepository from "../../../Domains/Places/Repositories/PlaceRepository.js";
import PlaceStockRepository from "../../../Domains/Stocks/Repositories/PlaceStockRepository.js";
import PromotionRuleRepository from "../../../Domains/Promotions/Repositories/PromotionRuleRepository.js";
import PromotionRepository from "../../../Domains/Promotions/Repositories/PromotionRepository.js";
import RecipeRepository from "../../../Domains/Recipes/Repositories/RecipeRepository.js";
import ReportFileRepository from "../../../Domains/ReportFiles/Repositories/ReportFileRepository.js";
import RoleRepository from "../../../Domains/Roles/Repositories/RoleRepository.js";
import ShiftRepository from "../../../Domains/Shifts/Repositories/ShiftRepository.js";
import StationRepository from "../../../Domains/Stations/Repositories/StationRepository.js";
import StockTransferRepository from "../../../Domains/Stocks/Repositories/StockTransferRepository.js";
import SupplierProductRepository from "../../../Domains/Suppliers/Repositories/SupplierProductRepository.js";
import SupplierRepository from "../../../Domains/Suppliers/Repositories/SupplierRepository.js";
import SystemLogRepository from "../../../Domains/Logs/Repositories/SystemLogRepository.js";
import TableRepository from "../../../Domains/Tables/Repositories/TableRepository.js";
import TransactionItemRepository from "../../../Domains/Transactions/Repositories/TransactionItemRepository.js";
import TransactionItemVariantRepository from "../../../Domains/Transactions/Repositories/TransactionItemVariantRepository.js";
import TransactionRepository from "../../../Domains/Transactions/Repositories/TransactionRepository.js";
import UnitRepository from "../../../Domains/Units/Repositories/UnitRepository.js";
import UserRepository from "../../../Domains/Users/Repositories/UserRepository.js";
import WasteRepository from "../../../Domains/Stocks/Repositories/WasteRepository.js";
import ActivityLogRepository from "../../../Domains/Logs/Repositories/ActivityLogRepository.js";

describe("Service constructors accept concrete repositories", () => {
	const cases = [
		{ Service: CategoryService, Repo: CategoryRepository, key: "categoryRepository" },
		{ Service: DeliveryIntegrationService, Repo: DeliveryIntegrationRepository, key: "deliveryIntegrationRepository" },
		{ Service: IngredientPackageService, Repo: IngredientPackageRepository, key: "ingredientPackageRepository" },
		{ Service: IngredientService, Repo: IngredientRepository, key: "ingredientRepository" },
		{ Service: ActivityLogService, Repo: ActivityLogRepository, key: "activityLogRepository" },
		{ Service: SystemLogService, Repo: SystemLogRepository, key: "systemLogRepository" },
		{ Service: MenuPriceService, Repo: MenuPriceRepository, key: "menuPriceRepository" },
		{ Service: MenuVariantItemService, Repo: MenuVariantItemRepository, key: "menuVariantItemRepository" },
		{ Service: MenuVariantService, Repo: MenuVariantRepository, key: "menuVariantRepository" },
		{ Service: MenuService, Repo: MenuRepository, key: "menuRepository" },
		{ Service: PackageService, Repo: PackageRepository, key: "packageRepository" },
		{ Service: PaymentMethodService, Repo: PaymentMethodRepository, key: "paymentMethodRepository" },
		{ Service: PermissionService, Repo: PermissionRepository, key: "permissionRepository" },
		{ Service: PlaceService, Repo: PlaceRepository, key: "placeRepository" },
		{ Service: PromotionRuleService, Repo: PromotionRuleRepository, key: "promotionRuleRepository" },
		{ Service: PromotionService, Repo: PromotionRepository, key: "promotionRepository" },
		{ Service: RecipeService, Repo: RecipeRepository, key: "recipeRepository" },
		{ Service: ReportFileService, Repo: ReportFileRepository, key: "reportFileRepository" },
		{ Service: RoleService, Repo: RoleRepository, key: "roleRepository" },
		{ Service: ShiftService, Repo: ShiftRepository, key: "shiftRepository" },
		{ Service: StationService, Repo: StationRepository, key: "stationRepository" },
		{ Service: CashierShiftService, Repo: CashierShiftRepository, key: "cashierShiftRepository" },
		{ Service: InventoryStockDailyService, Repo: InventoryStockDailyRepository, key: "inventoryStockDailyRepository" },
		{ Service: PlaceStockService, Repo: PlaceStockRepository, key: "placeStockRepository" },
		{ Service: StockTransferService, Repo: StockTransferRepository, key: "stockTransferRepository" },
		{ Service: WasteService, Repo: WasteRepository, key: "wasteRepository" },
		{ Service: SupplierProductService, Repo: SupplierProductRepository, key: "supplierProductRepository" },
		{ Service: SupplierService, Repo: SupplierRepository, key: "supplierRepository" },
		{ Service: TableService, Repo: TableRepository, key: "tableRepository" },
		{ Service: KitchenOrderService, Repo: KitchenOrderRepository, key: "kitchenOrderRepository" },
		{ Service: TransactionItemService, Repo: TransactionItemRepository, key: "transactionItemRepository" },
		{
			Service: TransactionItemVariantService,
			Repo: TransactionItemVariantRepository,
			key: "transactionItemVariantRepository"
		},
		{ Service: TransactionService, Repo: TransactionRepository, key: "transactionRepository" },
		{ Service: UnitService, Repo: UnitRepository, key: "unitRepository" },
		{ Service: UserService, Repo: UserRepository, key: "userRepository" }
	];

	it.each(cases)("accepts repository instance for %p", ({ Service, Repo, key }) => {
		const repo = new Repo();
		const service = new Service({ [key]: repo });
		expect(service).toBeInstanceOf(Service);
	});
});
