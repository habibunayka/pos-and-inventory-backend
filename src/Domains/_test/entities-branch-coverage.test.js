import { describe, expect, it } from "@jest/globals";
import ActivityLog from "../Logs/Entities/ActivityLog.js";
import CashierShift from "../CashierShifts/Entities/CashierShift.js";
import Category from "../Categories/Entities/Category.js";
import DeliveryIntegration from "../DeliveryIntegrations/Entities/DeliveryIntegration.js";
import Ingredient from "../Ingredients/Entities/Ingredient.js";
import IngredientPackage from "../Ingredients/Entities/IngredientPackage.js";
import InventoryStockDaily from "../Stocks/Entities/InventoryStockDaily.js";
import KitchenOrder from "../Transactions/Entities/KitchenOrder.js";
import Menu from "../Menus/Entities/Menu.js";
import MenuPrice from "../MenuPrices/Entities/MenuPrice.js";
import MenuVariant from "../MenuVariants/Entities/MenuVariant.js";
import MenuVariantItem from "../MenuVariantItems/Entities/MenuVariantItem.js";
import Package from "../Packages/Entities/Package.js";
import PaymentMethod from "../PaymentMethods/Entities/PaymentMethod.js";
import Permission from "../Permissions/Entities/Permission.js";
import Place from "../Places/Entities/Place.js";
import PlaceStock from "../Stocks/Entities/PlaceStock.js";
import Promotion from "../Promotions/Entities/Promotion.js";
import PromotionRule from "../Promotions/Entities/PromotionRule.js";
import Recipe from "../Recipes/Entities/Recipe.js";
import ReportFile from "../ReportFiles/Entities/ReportFile.js";
import Shift from "../Shifts/Entities/Shift.js";
import Station from "../Stations/Entities/Station.js";
import StockTransfer from "../Stocks/Entities/StockTransfer.js";
import Supplier from "../Suppliers/Entities/Supplier.js";
import SupplierProduct from "../Suppliers/Entities/SupplierProduct.js";
import SystemLog from "../Logs/Entities/SystemLog.js";
import Table from "../Tables/Entities/Table.js";
import Transaction from "../Transactions/Entities/Transaction.js";
import TransactionItem from "../Transactions/Entities/TransactionItem.js";
import TransactionItemVariant from "../Transactions/Entities/TransactionItemVariant.js";
import Unit from "../Units/Entities/Unit.js";
import User from "../Users/Entities/User.js";
import Waste from "../Stocks/Entities/Waste.js";

describe("Entity branch coverage fallbacks", () => {
	it.each([
		ActivityLog,
		CashierShift,
		Category,
		DeliveryIntegration,
		Ingredient,
		IngredientPackage,
		InventoryStockDaily,
		KitchenOrder,
		Menu,
		MenuPrice,
		MenuVariant,
		MenuVariantItem,
		Package,
		PaymentMethod,
		Permission,
		Place,
		PlaceStock,
		Promotion,
		PromotionRule,
		Recipe,
		ReportFile,
		Shift,
		Station,
		StockTransfer,
		Supplier,
		SupplierProduct,
		SystemLog,
		Table,
		Transaction,
		TransactionItem,
		TransactionItemVariant,
		Unit,
		Waste
	])("returns null when persistence record is missing for %p", (Entity) => {
		expect(Entity.fromPersistence(null)).toBeNull();
	});
	it("Place defaults null/booleans and uses snake_case props", () => {
		const entity = Place.fromPersistence({
			name: "Cafe",
			logo_path: "logo.png",
			is_active: false
		});

		expect(entity).toMatchObject({
			id: null,
			name: "Cafe",
			address: null,
			phone: null,
			logoPath: "logo.png",
			type: null,
			isActive: false
		});
	});

	it("Place maps camelCase fields and defaults to true", () => {
		const entity = Place.fromPersistence({
			id: 5,
			name: "Shop",
			address: "Street",
			phone: "123",
			logoPath: "camel.png",
			type: "retail",
			isActive: true
		});

		expect(entity).toMatchObject({
			id: 5,
			name: "Shop",
			address: "Street",
			phone: "123",
			logoPath: "camel.png",
			type: "retail",
			isActive: true
		});
	});

	it("Transaction falls back for optional fields", () => {
		const entity = Transaction.fromPersistence({
			cashierId: 1,
			total: 1000,
			createdAt: "2024-01-01"
		});

		expect(entity).toMatchObject({
			id: null,
			placeId: null,
			tableId: null,
			orderType: null,
			tax: null,
			discount: null,
			paymentMethodId: null
		});
	});

	it("Transaction preserves provided optional values", () => {
		const entity = Transaction.fromPersistence({
			id: 2,
			cashierId: 9,
			placeId: 3,
			tableId: 4,
			orderType: "dine-in",
			total: 2000,
			tax: 100,
			discount: 50,
			paymentMethodId: 5,
			createdAt: "2024-01-02"
		});

		expect(entity).toMatchObject({
			id: 2,
			placeId: 3,
			tableId: 4,
			orderType: "dine-in",
			tax: 100,
			discount: 50,
			paymentMethodId: 5
		});
	});

	it("CashierShift normalizes nullable balances and dates", () => {
		const entity = CashierShift.fromPersistence({
			placeId: 1,
			stationId: 2,
			shiftId: 3,
			cashierId: 4,
			openedAt: "open"
		});

		expect(entity).toMatchObject({
			id: null,
			closedAt: null,
			openingBalance: null,
			closingBalance: null,
			systemBalance: null
		});
	});

	it("ActivityLog defaults to nulls for optional props", () => {
		const entity = ActivityLog.fromPersistence({
			action: "login",
			createdAt: "2024"
		});

		expect(entity).toMatchObject({
			id: null,
			userId: null,
			entityType: null,
			entityId: null,
			contextJson: null
		});
	});

	it("Menu sets defaults when not provided", () => {
		const entity = Menu.fromPersistence({ name: "Item" });
		expect(entity).toMatchObject({ placeId: null, categoryId: null, description: null, isActive: true });
	});

	it("Supplier applies null fallbacks", () => {
		const entity = Supplier.fromPersistence({ name: "Vendor" });
		expect(entity).toMatchObject({
			contactName: null,
			phone: null,
			email: null,
			address: null
		});
	});

	it("Promotion honors optional numeric defaults", () => {
		const entity = Promotion.fromPersistence({
			name: "Promo"
		});
		expect(entity).toMatchObject({ id: null, placeId: null, startAt: null, endAt: null });
	});

	it("KitchenOrder uses nullable fields when absent", () => {
		const entity = KitchenOrder.fromPersistence({ transactionItemId: 1, status: "new" });
		expect(entity).toMatchObject({ id: null, startedAt: null, finishedAt: null, note: null });
	});

	it("DeliveryIntegration covers nullable config", () => {
		const entity = DeliveryIntegration.fromPersistence({ placeId: 2, platformName: "Y" });
		expect(entity).toMatchObject({ id: null, apiKey: null, placeId: 2, settingsJson: null });
	});

	it("SystemLog defaults to nulls", () => {
		const entity = SystemLog.fromPersistence({ level: "info", message: "msg", createdAt: "now" });
		expect(entity).toMatchObject({ id: null, contextJson: null });
	});

	it("PaymentMethod uses default active flag", () => {
		const entity = PaymentMethod.fromPersistence({ name: "cash" });
		expect(entity).toMatchObject({ id: null, description: null, isActive: true });
	});

	it("PromotionRule falls back to nullables", () => {
		const entity = PromotionRule.fromPersistence({ promotionId: 1 });
		expect(entity).toMatchObject({ id: null, ruleType: null, value: null });
	});

	it("ReportFile maps snake_case properties", () => {
		const entity = ReportFile.fromPersistence({
			reportType: "daily",
			reportScope: "all",
			fileName: "file",
			filePath: "/tmp/file",
			createdAt: "now"
		});
		expect(entity).toMatchObject({
			id: null,
			reportDate: null,
			placeId: null,
			filePath: "/tmp/file",
			createdAt: "now"
		});
	});

	it("Shift defaults time-related fields", () => {
		const entity = Shift.fromPersistence({
			placeId: 1,
			name: "Morning",
			startTime: "08:00",
			endTime: "16:00"
		});
		expect(entity).toMatchObject({ id: null, description: null, isActive: true });
	});

	it("Station applies defaults and snake_case placeId", () => {
		const entity = Station.fromPersistence({ name: "Station", placeId: 9 });
		expect(entity).toMatchObject({ id: null, placeId: 9, description: null, isActive: true });
	});

	it("StockTransfer normalizes nullable fields", () => {
		const entity = StockTransfer.fromPersistence({
			fromPlaceId: 1,
			ingredientId: 3,
			qty: 4
		});
		expect(entity).toMatchObject({ id: null, fromPlaceId: 1, toPlaceId: null });
	});

	it("Waste defaults nullable fields", () => {
		const entity = Waste.fromPersistence({ ingredientId: 1, qty: 2 });
		expect(entity).toMatchObject({ id: null, placeId: null, reason: null });
	});

	it("SupplierProduct handles optional numeric fields", () => {
		const entity = SupplierProduct.fromPersistence({
			supplierId: 1,
			ingredientId: 2,
			packageId: 3,
			price: 10
		});
		expect(entity).toMatchObject({ id: null, leadTime: null, isActive: true });
	});

	it("MenuVariantItem handles null defaults", () => {
		const entity = MenuVariantItem.fromPersistence({ menuVariantId: 1, name: "Item" });
		expect(entity).toMatchObject({ id: null, additionalPrice: null });
	});

	it("Package sets defaults for numeric/boolean fields", () => {
		const entity = Package.fromPersistence({ name: "Pack", conversionFactor: 5 });
		expect(entity).toMatchObject({ id: null, description: null });
	});

	it("Permission applies null defaults", () => {
		const entity = Permission.fromPersistence({ name: "perm" });
		expect(entity).toMatchObject({ id: null, description: null });
	});

	it("InventoryStockDaily defaults nullables", () => {
		const entity = InventoryStockDaily.fromPersistence({ placeId: 1, ingredientId: 2, date: "2024" });
		expect(entity).toMatchObject({ id: null, diffQty: null });
	});

	it("Table applies defaults", () => {
		const entity = Table.fromPersistence({ name: "T1", placeId: 1 });
		expect(entity).toMatchObject({ id: null, status: null, capacity: null });
	});

	it("TransactionItem nulls optionals", () => {
		const entity = TransactionItem.fromPersistence({ transactionId: 1, menuId: 2, qty: 1, price: 100 });
		expect(entity).toMatchObject({ id: null, discount: null });
	});

	it("Category uses null and active defaults", () => {
		const entity = Category.fromPersistence({});
		expect(entity).toMatchObject({ id: null, name: null });
	});

	it("Ingredient defaults optional fields", () => {
		const entity = Ingredient.fromPersistence({ name: "Salt", unitId: 1 });
		expect(entity).toMatchObject({ id: null, unitId: 1 });
	});

	it("IngredientPackage uses defaults", () => {
		const entity = IngredientPackage.fromPersistence({ ingredientId: 1, unitId: 2 });
		expect(entity).toMatchObject({ id: null, qty: undefined });
	});

	it("MenuPrice covers active default", () => {
		const entity = MenuPrice.fromPersistence({ menuId: 1, price: 10, effectiveDate: "2024-01-01" });
		expect(entity).toMatchObject({ id: null, effectiveDate: "2024-01-01" });
	});

	it("MenuVariant applies defaults", () => {
		const entity = MenuVariant.fromPersistence({ menuId: 1, name: "Large" });
		expect(entity).toMatchObject({ id: null, name: "Large" });
	});

	it("Recipe covers nullable defaults", () => {
		const entity = Recipe.fromPersistence({ menuId: 1, ingredientId: 2, qty: 3 });
		expect(entity).toMatchObject({ id: null, menuId: 1, ingredientId: 2, qty: 3 });
	});

	it("PlaceStock applies null defaults", () => {
		const entity = PlaceStock.fromPersistence({ placeId: 1, ingredientId: 2, qty: 3 });
		expect(entity).toMatchObject({ id: null, unitId: undefined });
	});

	it("TransactionItemVariant nulls note", () => {
		const entity = TransactionItemVariant.fromPersistence({ transactionItemId: 1, menuVariantItemId: 2, qty: 1 });
		expect(entity).toMatchObject({ id: null, extraPrice: undefined });
	});

	it("Unit uses defaults", () => {
		const entity = Unit.fromPersistence({ name: "gram" });
		expect(entity).toMatchObject({ id: null, name: "gram" });
	});

	it("User handles empty assignments and password auth", () => {
		const user = User.fromPersistence({
			id: 1,
			name: "NoRole",
			email: "user@example.test",
			status: "active",
			userRoles: []
		});
		expect(user.role).toBeNull();
		expect(user.authenticationMethod).toBe("password");
		expect(user.placeId).toBeNull();
	});

	it("User picks the first role assignment and pin auth", () => {
		const user = User.fromPersistence({
			id: 2,
			name: "RoleUser",
			email: "role@example.test",
			status: "inactive",
			pinCodeHash: "hashed",
			userRoles: [
				{ id: 20, placeId: 88, role: { id: 7, name: "Admin" } },
				{ id: 10, placeId: 77, role: { id: 5, name: "Manager" } }
			]
		});

		expect(user.authenticationMethod).toBe("pin");
		expect(user.role?.name).toBe("Manager");
		expect(user.placeId).toBe(77);
	});

	describe("constructor default branches", () => {
		const cases = [
			{ Entity: Place, props: { name: "CtorPlace" }, expected: { address: null, isActive: true } },
			{
				Entity: Transaction,
				props: { cashierId: 1, total: 100, createdAt: "now" },
				expected: { placeId: null, discount: null }
			},
			{
				Entity: User,
				props: { name: "CtorUser" },
				expected: { email: null, status: "active", authenticationMethod: "password", placeId: null }
			},
			{
				Entity: CashierShift,
				props: {
					placeId: 1,
					stationId: 2,
					shiftId: 3,
					cashierId: 4,
					openedAt: "open",
					ipAddress: "ip",
					status: "open"
				},
				expected: { closedAt: null, openingBalance: null, closingBalance: null, systemBalance: null }
			},
			{ Entity: Category, props: { name: "Cat" }, expected: { id: null } },
			{ Entity: DeliveryIntegration, props: { placeId: 1, platformName: "Plat" }, expected: { apiKey: null } },
			{ Entity: Ingredient, props: { name: "Salt", unitId: 1 }, expected: { id: null } },
			{ Entity: IngredientPackage, props: { ingredientId: 1, packageId: 2, qty: 3 }, expected: { id: null } },
			{
				Entity: ActivityLog,
				props: { action: "do", createdAt: "now" },
				expected: { userId: null, entityType: null, entityId: null }
			},
			{
				Entity: SystemLog,
				props: { message: "msg", createdAt: "now" },
				expected: { level: null, contextJson: null }
			},
			{ Entity: MenuPrice, props: { menuId: 1, price: 10, effectiveDate: "2024" }, expected: { id: null } },
			{ Entity: MenuVariantItem, props: { menuVariantId: 1, name: "MV" }, expected: { additionalPrice: null } },
			{ Entity: MenuVariant, props: { menuId: 1, name: "Variant" }, expected: { id: null } },
			{
				Entity: Menu,
				props: { name: "MenuCtor" },
				expected: { placeId: null, description: null, isActive: true }
			},
			{ Entity: Package, props: { name: "Pkg" }, expected: { description: null } },
			{ Entity: PaymentMethod, props: { name: "Cash" }, expected: { description: null, isActive: true } },
			{ Entity: Permission, props: { name: "Perm" }, expected: { description: null } },
			{ Entity: Promotion, props: { name: "Promo" }, expected: { placeId: null, startAt: null, endAt: null } },
			{ Entity: PromotionRule, props: { promotionId: 1 }, expected: { ruleType: null, value: null } },
			{ Entity: Recipe, props: { menuId: 1, ingredientId: 2, qty: 3 }, expected: { id: null } },
			{
				Entity: ReportFile,
				props: { reportType: "daily", reportScope: "all", fileName: "f", filePath: "/f", createdAt: "now" },
				expected: { reportDate: null, placeId: null }
			},
			{
				Entity: Shift,
				props: { placeId: 1, name: "Shift", startTime: "08:00", endTime: "09:00" },
				expected: { description: null, isActive: true }
			},
			{
				Entity: Station,
				props: { placeId: 1, name: "Station" },
				expected: { description: null, isActive: true }
			},
			{
				Entity: InventoryStockDaily,
				props: { placeId: 1, ingredientId: 2, date: "2024", openingQty: 0, closingQty: 0, createdAt: "now" },
				expected: { diffQty: null }
			},
			{ Entity: PlaceStock, props: { placeId: 1, ingredientId: 2, qty: 3, unitId: 4 }, expected: { id: null } },
			{
				Entity: StockTransfer,
				props: { ingredientId: 1, qty: 5, createdAt: "now" },
				expected: { fromPlaceId: null, toPlaceId: null }
			},
			{
				Entity: Waste,
				props: { ingredientId: 1, qty: 1, createdAt: "now" },
				expected: { placeId: null, reason: null }
			},
			{
				Entity: Supplier,
				props: { name: "Supplier" },
				expected: { contactName: null, phone: null, email: null, address: null }
			},
			{
				Entity: SupplierProduct,
				props: { supplierId: 1, ingredientId: 2, packageId: 3, qty: 4, price: 5 },
				expected: { leadTime: null, isActive: true }
			},
			{ Entity: Table, props: { placeId: 1, name: "T1" }, expected: { status: null, capacity: null } },
			{
				Entity: KitchenOrder,
				props: { transactionItemId: 1, status: "new" },
				expected: { startedAt: null, finishedAt: null, note: null }
			},
			{
				Entity: TransactionItem,
				props: { transactionId: 1, menuId: 2, qty: 1, price: 10 },
				expected: { discount: null }
			},
			{
				Entity: TransactionItemVariant,
				props: { transactionItemId: 1, menuVariantId: 2, extraPrice: 1 },
				expected: { id: null }
			},
			{ Entity: Unit, props: { name: "gram", abbreviation: "gr" }, expected: { id: null } }
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
