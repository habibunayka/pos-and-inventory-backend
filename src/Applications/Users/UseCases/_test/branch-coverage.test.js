import { describe, expect, test, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import UpdateUserUsecase from "../UpdateUserUsecase.js";

describe("Users usecase branch coverage", () => {
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
});
