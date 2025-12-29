import PlaceStock from "./PlaceStock.js";
import CreatePlaceStockRequest from "./CreatePlaceStockRequest.js";
import UpdatePlaceStockRequest from "./UpdatePlaceStockRequest.js";
import InventoryStockDaily from "./InventoryStockDaily.js";
import CreateInventoryStockDailyRequest from "./CreateInventoryStockDailyRequest.js";
import UpdateInventoryStockDailyRequest from "./UpdateInventoryStockDailyRequest.js";
import StockTransfer from "./StockTransfer.js";
import CreateStockTransferRequest from "./CreateStockTransferRequest.js";
import Waste from "./Waste.js";
import CreateWasteRequest from "./CreateWasteRequest.js";
import UpdateWasteRequest from "./UpdateWasteRequest.js";
import Station from "./Station.js";
import CreateStationRequest from "./CreateStationRequest.js";
import UpdateStationRequest from "./UpdateStationRequest.js";
import Shift from "./Shift.js";
import CreateShiftRequest from "./CreateShiftRequest.js";
import UpdateShiftRequest from "./UpdateShiftRequest.js";
import CashierShift from "./CashierShift.js";
import CreateCashierShiftRequest from "./CreateCashierShiftRequest.js";
import UpdateCashierShiftRequest from "./UpdateCashierShiftRequest.js";
import CloseCashierShiftRequest from "./CloseCashierShiftRequest.js";
import Promotion from "./Promotion.js";
import CreatePromotionRequest from "./CreatePromotionRequest.js";
import UpdatePromotionRequest from "./UpdatePromotionRequest.js";
import PromotionRule from "./PromotionRule.js";
import CreatePromotionRuleRequest from "./CreatePromotionRuleRequest.js";
import UpdatePromotionRuleRequest from "./UpdatePromotionRuleRequest.js";
import Transaction from "./Transaction.js";
import CreateTransactionRequest from "./CreateTransactionRequest.js";
import UpdateTransactionRequest from "./UpdateTransactionRequest.js";
import TransactionItem from "./TransactionItem.js";
import CreateTransactionItemRequest from "./CreateTransactionItemRequest.js";
import UpdateTransactionItemRequest from "./UpdateTransactionItemRequest.js";
import TransactionItemVariant from "./TransactionItemVariant.js";
import CreateTransactionItemVariantRequest from "./CreateTransactionItemVariantRequest.js";
import KitchenOrder from "./KitchenOrder.js";
import CreateKitchenOrderRequest from "./CreateKitchenOrderRequest.js";
import UpdateKitchenOrderRequest from "./UpdateKitchenOrderRequest.js";
import ActivityLog from "./ActivityLog.js";
import CreateActivityLogRequest from "./CreateActivityLogRequest.js";
import SystemLog from "./SystemLog.js";
import CreateSystemLogRequest from "./CreateSystemLogRequest.js";
import ReportFile from "./ReportFile.js";
import CreateReportFileRequest from "./CreateReportFileRequest.js";
import UpdateReportFileRequest from "./UpdateReportFileRequest.js";
import DeliveryIntegration from "./DeliveryIntegration.js";
import CreateDeliveryIntegrationRequest from "./CreateDeliveryIntegrationRequest.js";
import UpdateDeliveryIntegrationRequest from "./UpdateDeliveryIntegrationRequest.js";
import PaymentMethod from "./PaymentMethod.js";
import CreatePaymentMethodRequest from "./CreatePaymentMethodRequest.js";
import UpdatePaymentMethodRequest from "./UpdatePaymentMethodRequest.js";
import MenuVariant from "./MenuVariant.js";
import CreateMenuVariantRequest from "./CreateMenuVariantRequest.js";
import UpdateMenuVariantRequest from "./UpdateMenuVariantRequest.js";
import MenuVariantItem from "./MenuVariantItem.js";
import CreateMenuVariantItemRequest from "./CreateMenuVariantItemRequest.js";
import UpdateMenuVariantItemRequest from "./UpdateMenuVariantItemRequest.js";
import Recipe from "./Recipe.js";
import CreateRecipeRequest from "./CreateRecipeRequest.js";
import UpdateRecipeRequest from "./UpdateRecipeRequest.js";
import Menu from "./Menu.js";
import CreateMenuRequest from "./CreateMenuRequest.js";
import UpdateMenuRequest from "./UpdateMenuRequest.js";
import MenuPrice from "./MenuPrice.js";
import CreateMenuPriceRequest from "./CreateMenuPriceRequest.js";
import UpdateMenuPriceRequest from "./UpdateMenuPriceRequest.js";
import Category from "./Category.js";
import CreateCategoryRequest from "./CreateCategoryRequest.js";
import UpdateCategoryRequest from "./UpdateCategoryRequest.js";
import CreateUnitRequest from "./CreateUnitRequest.js";
import UpdateUnitRequest from "./UpdateUnitRequest.js";
import CreateTableRequest from "./CreateTableRequest.js";
import UpdateTableRequest from "./UpdateTableRequest.js";
import CreateIngredientRequest from "./CreateIngredientRequest.js";
import UpdateIngredientRequest from "./UpdateIngredientRequest.js";
import CreatePackageRequest from "./CreatePackageRequest.js";
import UpdatePackageRequest from "./UpdatePackageRequest.js";
import CreateIngredientPackageRequest from "./CreateIngredientPackageRequest.js";
import UpdateIngredientPackageRequest from "./UpdateIngredientPackageRequest.js";
import CreateSupplierRequest from "./CreateSupplierRequest.js";
import UpdateSupplierRequest from "./UpdateSupplierRequest.js";
import CreateSupplierProductRequest from "./CreateSupplierProductRequest.js";
import UpdateSupplierProductRequest from "./UpdateSupplierProductRequest.js";
import CreatePermissionRequest from "./CreatePermissionRequest.js";
import UpdatePermissionRequest from "./UpdatePermissionRequest.js";
import User from "./User.js";
import Role from "./Role.js";
import Place from "./Place.js";
import CreateRoleRequest from "./CreateRoleRequest.js";
import UpdateRoleRequest from "./UpdateRoleRequest.js";
import CreatePlaceRequest from "./CreatePlaceRequest.js";
import UpdatePlaceRequest from "./UpdatePlaceRequest.js";
import CreateUserRequest from "./CreateUserRequest.js";
import UpdateUserRequest from "./UpdateUserRequest.js";
import ErrorResponse from "./ErrorResponse.js";
import LoginRequest from "./LoginRequest.js";
import LoginResponse from "./LoginResponse.js";
import LoginWithPinRequest from "./LoginWithPinRequest.js";
import Unit from "./Unit.js";
import Table from "./Table.js";
import Ingredient from "./Ingredient.js";
import Package from "./Package.js";
import IngredientPackage from "./IngredientPackage.js";
import Supplier from "./Supplier.js";
import SupplierProduct from "./SupplierProduct.js";
import Permission from "./Permission.js";

const schemas = {
	PlaceStock,
	CreatePlaceStockRequest,
	UpdatePlaceStockRequest,
	InventoryStockDaily,
	CreateInventoryStockDailyRequest,
	UpdateInventoryStockDailyRequest,
	StockTransfer,
	CreateStockTransferRequest,
	Waste,
	CreateWasteRequest,
	UpdateWasteRequest,
	Station,
	CreateStationRequest,
	UpdateStationRequest,
	Shift,
	CreateShiftRequest,
	UpdateShiftRequest,
	CashierShift,
	CreateCashierShiftRequest,
	UpdateCashierShiftRequest,
	CloseCashierShiftRequest,
	Promotion,
	CreatePromotionRequest,
	UpdatePromotionRequest,
	PromotionRule,
	CreatePromotionRuleRequest,
	UpdatePromotionRuleRequest,
	Transaction,
	CreateTransactionRequest,
	UpdateTransactionRequest,
	TransactionItem,
	CreateTransactionItemRequest,
	UpdateTransactionItemRequest,
	TransactionItemVariant,
	CreateTransactionItemVariantRequest,
	KitchenOrder,
	CreateKitchenOrderRequest,
	UpdateKitchenOrderRequest,
	ActivityLog,
	CreateActivityLogRequest,
	SystemLog,
	CreateSystemLogRequest,
	ReportFile,
	CreateReportFileRequest,
	UpdateReportFileRequest,
	DeliveryIntegration,
	CreateDeliveryIntegrationRequest,
	UpdateDeliveryIntegrationRequest,
	PaymentMethod,
	CreatePaymentMethodRequest,
	UpdatePaymentMethodRequest,
	MenuVariant,
	CreateMenuVariantRequest,
	UpdateMenuVariantRequest,
	MenuVariantItem,
	CreateMenuVariantItemRequest,
	UpdateMenuVariantItemRequest,
	Recipe,
	CreateRecipeRequest,
	UpdateRecipeRequest,
	Menu,
	CreateMenuRequest,
	UpdateMenuRequest,
	MenuPrice,
	CreateMenuPriceRequest,
	UpdateMenuPriceRequest,
	Category,
	CreateCategoryRequest,
	UpdateCategoryRequest,
	CreateUnitRequest,
	UpdateUnitRequest,
	CreateTableRequest,
	UpdateTableRequest,
	CreateIngredientRequest,
	UpdateIngredientRequest,
	CreatePackageRequest,
	UpdatePackageRequest,
	CreateIngredientPackageRequest,
	UpdateIngredientPackageRequest,
	CreateSupplierRequest,
	UpdateSupplierRequest,
	CreateSupplierProductRequest,
	UpdateSupplierProductRequest,
	CreatePermissionRequest,
	UpdatePermissionRequest,
	User,
	Role,
	Place,
	CreateRoleRequest,
	UpdateRoleRequest,
	CreatePlaceRequest,
	UpdatePlaceRequest,
	CreateUserRequest,
	UpdateUserRequest,
	ErrorResponse,
	LoginRequest,
	LoginResponse,
	LoginWithPinRequest,
	Unit,
	Table,
	Ingredient,
	Package,
	IngredientPackage,
	Supplier,
	SupplierProduct,
	Permission
};

export default schemas;
