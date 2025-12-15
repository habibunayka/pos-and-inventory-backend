import { jest } from "@jest/globals";
import UserService from "../UserService.js";

describe("UserService", () => {
	let mockRepo;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			findRoleByName: jest.fn(),
			findByEmail: jest.fn(),
			findByName: jest.fn(),
			createUser: jest.fn(),
			updateUser: jest.fn()
		};
	});

	test("should throw when repository is missing", () => {
		expect(() => new UserService()).toThrow("USER_SERVICE.MISSING_REPOSITORY");
	});

	test("should throw when repository missing required methods", () => {
		const badRepo = { findAll: jest.fn() };

		expect(() => new UserService({ userRepository: badRepo })).toThrow(
			"USER_SERVICE.INVALID_REPOSITORY: missing findById"
		);
	});

	test("should store repository when valid", () => {
		const service = new UserService({ userRepository: mockRepo });

		expect(service._userRepository).toBe(mockRepo);
	});

	test("listUsers should delegate to repository", async () => {
		mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
		const service = new UserService({ userRepository: mockRepo });

		const result = service.listUsers();

		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
		await expect(result).resolves.toEqual([{ id: 1 }]);
	});

	test("getUser should delegate to repository", async () => {
		mockRepo.findById.mockResolvedValue({ id: 2 });
		const service = new UserService({ userRepository: mockRepo });

		const result = service.getUser(2);

		expect(mockRepo.findById).toHaveBeenCalledWith(2);
		await expect(result).resolves.toEqual({ id: 2 });
	});

	test("findRoleByName should delegate to repository", async () => {
		mockRepo.findRoleByName.mockResolvedValue({ id: 1, name: "cashier" });
		const service = new UserService({ userRepository: mockRepo });

		const result = service.findRoleByName("cashier");

		expect(mockRepo.findRoleByName).toHaveBeenCalledWith("cashier");
		await expect(result).resolves.toEqual({ id: 1, name: "cashier" });
	});

	test("findByEmail should delegate to repository", async () => {
		mockRepo.findByEmail.mockResolvedValue({ id: 3, email: "a@b.com" });
		const service = new UserService({ userRepository: mockRepo });

		const result = service.findByEmail("a@b.com");

		expect(mockRepo.findByEmail).toHaveBeenCalledWith("a@b.com");
		await expect(result).resolves.toEqual({ id: 3, email: "a@b.com" });
	});

	test("findByName should delegate to repository if available", async () => {
		mockRepo.findByName.mockResolvedValue({ id: 4, name: "john" });
		const service = new UserService({ userRepository: mockRepo });

		const result = service.findByName("john");

		expect(mockRepo.findByName).toHaveBeenCalledWith("john");
		await expect(result).resolves.toEqual({ id: 4, name: "john" });
	});

	test("createUser should delegate to repository", async () => {
		const payload = { name: "john" };
		mockRepo.createUser.mockResolvedValue({ id: 10, ...payload });
		const service = new UserService({ userRepository: mockRepo });

		const result = service.createUser(payload);

		expect(mockRepo.createUser).toHaveBeenCalledWith(payload);
		await expect(result).resolves.toEqual({ id: 10, name: "john" });
	});

	test("updateUser should delegate to repository", async () => {
		const payload = { id: 1, userData: { name: "new" } };
		mockRepo.updateUser.mockResolvedValue(payload);
		const service = new UserService({ userRepository: mockRepo });

		const result = service.updateUser(payload);

		expect(mockRepo.updateUser).toHaveBeenCalledWith(payload);
		await expect(result).resolves.toEqual(payload);
	});
});
