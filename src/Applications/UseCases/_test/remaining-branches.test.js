import { jest } from "@jest/globals";
import ValidationError from "../../../Commons/Errors/ValidationError.js";
import CreateMenuVariantUsecase from "../../MenuVariants/UseCases/CreateMenuVariantUsecase.js";
import UpdatePlaceUsecase from "../../Places/UseCases/UpdatePlaceUsecase.js";
import CreateShiftUsecase from "../../Shifts/UseCases/CreateShiftUsecase.js";
import CreatePermissionUsecase from "../../Permissions/UseCases/CreatePermissionUsecase.js";
import CreateMenuUsecase from "../../Menus/UseCases/CreateMenuUsecase.js";
import CreateCashierShiftUsecase from "../../Stocks/UseCases/cashierShifts/CreateCashierShiftUsecase.js";
import UpdateUserUsecase from "../../Users/UseCases/UpdateUserUsecase.js";
import CreateKitchenOrderUsecase from "../../Transactions/UseCases/kitchenOrders/CreateKitchenOrderUsecase.js";
import UpdateTransactionItemUsecase from "../../Transactions/UseCases/transactionItems/UpdateTransactionItemUsecase.js";
import CreateTableUsecase from "../../Tables/UseCases/CreateTableUsecase.js";

describe("Remaining branch coverage helpers", () => {
	test("CreateMenuVariantUsecase handles missing name via nullish fallback", async () => {
		const menuVariantService = { createMenuVariant: jest.fn() };
		const usecase = new CreateMenuVariantUsecase({ menuVariantService });

		await expect(usecase.execute({ menuId: 1 })).rejects.toThrow(new ValidationError("name is required"));
	});

	test("UpdatePlaceUsecase default payload branch", async () => {
		const placeService = { updatePlace: jest.fn() };
		const usecase = new UpdatePlaceUsecase({ placeService });

		await expect(usecase.execute(1)).rejects.toThrow(new ValidationError("At least one field must be provided"));
	});

	test("CreateShiftUsecase covers nullish name and empty description", async () => {
		const shiftService = { createShift: jest.fn() };
		const placeService = { supportsPlaceValidation: false, getPlace: jest.fn() };
		const usecase = new CreateShiftUsecase({ shiftService, placeService });

		await expect(usecase.execute({ placeId: 1, startTime: "08:00", endTime: "09:00" })).rejects.toThrow(
			new ValidationError("name is required")
		);

		await usecase.execute({
			placeId: 1,
			name: "DescNull",
			startTime: "08:00",
			endTime: "09:00",
			description: ""
		});

		expect(shiftService.createShift).toHaveBeenLastCalledWith({
			placeId: 1,
			name: "DescNull",
			startTime: "08:00",
			endTime: "09:00",
			description: null
		});
	});

	test("CreatePermissionUsecase handles missing/blank description branches", async () => {
		const permissionService = {
			getPermissionByName: jest.fn().mockResolvedValue(null),
			createPermission: jest.fn()
		};
		const usecase = new CreatePermissionUsecase({ permissionService });

		await usecase.execute({ name: "view" });
		expect(permissionService.createPermission).toHaveBeenCalledWith({ name: "view", description: null });

		await usecase.execute({ name: "edit", description: "   " });
		expect(permissionService.createPermission).toHaveBeenLastCalledWith({ name: "edit", description: null });
	});

	test("CreateMenuUsecase default arg and nullish name handling", async () => {
		const menuService = { createMenu: jest.fn() };
		const usecase = new CreateMenuUsecase({ menuService });

		await expect(usecase.execute()).rejects.toThrow("name is required");
	});

	test("CreateCashierShiftUsecase nullish ip/status handling", async () => {
		const cashierShiftService = { create: jest.fn() };
		const usecase = new CreateCashierShiftUsecase({
			cashierShiftService,
			placeService: { supportsPlaceValidation: false },
			stationService: null,
			shiftService: null
		});

		await expect(usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4 })).rejects.toThrow(
			new ValidationError("ipAddress is required")
		);

		await expect(
			usecase.execute({ placeId: 1, stationId: 2, shiftId: 3, cashierId: 4, ipAddress: "1.1.1.1", status: null })
		).rejects.toThrow(new ValidationError("status cannot be empty when provided"));
	});

	test("UpdateUserUsecase covers default payload", async () => {
		const baseUser = {
			id: 5,
			name: "Existing",
			email: "old@example.com",
			status: "active",
			pinCodeHash: null,
			userRoles: [{ role: { id: 3, name: "manager" }, placeId: 10 }]
		};
		const userService = {
			getUser: jest.fn().mockResolvedValue(baseUser),
			findRoleByName: jest.fn().mockResolvedValue({ id: 3, name: "manager" }),
			findByEmail: jest.fn().mockResolvedValue(null),
			updateUser: jest.fn().mockResolvedValue(baseUser)
		};
		const placeService = { supportsPlaceValidation: false, getPlace: jest.fn() };
		const usecase = new UpdateUserUsecase({ userService, placeService });

		await usecase.execute(5);
		expect(userService.updateUser).toHaveBeenCalledWith({
			id: 5,
			userData: { email: "old@example.com", pinCodeHash: null },
			roleId: 3,
			placeId: 10
		});
	});

	test("UpdateUserUsecase allows cashier without new pin when already using pin auth", async () => {
		const cashierRecord = {
			id: 6,
			email: null,
			status: "active",
			pinCodeHash: "pin",
			userRoles: [{ role: { id: 1, name: "cashier" }, placeId: null }]
		};
		const userService = {
			getUser: jest.fn().mockResolvedValue(cashierRecord),
			findRoleByName: jest.fn().mockResolvedValue({ id: 1, name: "cashier" }),
			findByEmail: jest.fn(),
			updateUser: jest.fn().mockResolvedValue(cashierRecord)
		};
		const placeService = { supportsPlaceValidation: false, getPlace: jest.fn() };
		const usecase = new UpdateUserUsecase({ userService, placeService });

		await usecase.execute(6, {});
		expect(userService.updateUser).toHaveBeenLastCalledWith({
			id: 6,
			userData: { email: null, passwordHash: null },
			roleId: 1,
			placeId: null
		});
	});

	test("UpdateUserUsecase requires password for non-cashier when last auth was pin", async () => {
		const pinNonCashierRecord = {
			id: 7,
			email: null,
			status: "active",
			pinCodeHash: "pin",
			userRoles: []
		};
		const userService = {
			getUser: jest.fn().mockResolvedValue(pinNonCashierRecord),
			findRoleByName: jest.fn().mockResolvedValue({ id: 3, name: "manager" }),
			findByEmail: jest.fn().mockResolvedValue(null),
			updateUser: jest.fn()
		};
		const placeService = { supportsPlaceValidation: false, getPlace: jest.fn() };
		const usecase = new UpdateUserUsecase({ userService, placeService });

		await expect(usecase.execute(7, { roleName: "manager", email: "new@example.com" })).rejects.toThrow(
			new ValidationError("Password is required for non-cashier roles")
		);
	});

	test("CreateKitchenOrderUsecase handles falsy startedAt and note null", async () => {
		const kitchenOrderService = { createKitchenOrder: jest.fn() };
		const usecase = new CreateKitchenOrderUsecase({ kitchenOrderService });

		await usecase.execute({
			transactionItemId: 1,
			startedAt: "",
			finishedAt: "2023-01-01T00:00:00.000Z",
			note: null
		});

		expect(kitchenOrderService.createKitchenOrder).toHaveBeenCalledWith({
			transactionItemId: 1,
			startedAt: null,
			finishedAt: expect.any(Date),
			note: null
		});
	});

	test("UpdateTransactionItemUsecase default payload and discount omission", async () => {
		const service = { updateItem: jest.fn() };
		const usecase = new UpdateTransactionItemUsecase({ transactionItemService: service });

		await usecase.execute(1);
		expect(service.updateItem).toHaveBeenCalledWith({ id: 1, data: {} });
	});

	test("CreateTableUsecase covers default args and nullish name branch", async () => {
		const tableService = { createTable: jest.fn() };
		const placeService = { supportsPlaceValidation: false };
		const usecase = new CreateTableUsecase({ tableService, placeService });

		await expect(usecase.execute()).rejects.toThrow(new ValidationError("placeId must be a positive integer"));
		await expect(usecase.execute({ placeId: 1, capacity: 2 })).rejects.toThrow(
			new ValidationError("name is required")
		);
	});
});
