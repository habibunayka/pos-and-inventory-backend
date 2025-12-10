import { jest } from "@jest/globals";
import errorHandler from "../ErrorHandler.js";
import AppError from "../../../Commons/Errors/AppError.js";
import HttpStatus from "../../../Commons/Constants/HttpStatus.js";

jest.unstable_mockModule("../../../Infrastructures/Logger/WinstonLogger.js", () => ({
	default: { error: jest.fn() }
}));

describe("ErrorHandler middleware", () => {
	const res = () => {
		const obj = {};
		obj.status = jest.fn().mockReturnValue(obj);
		obj.json = jest.fn().mockReturnValue(obj);
		return obj;
	};

	test("should format AppError with details", () => {
		const response = res();
		const err = new AppError("fail", HttpStatus.BAD_REQUEST, { a: 1 });

		errorHandler(err, {}, response, jest.fn());

		expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
		expect(response.json).toHaveBeenCalledWith({ message: "fail", details: { a: 1 } });
	});

	test("should fallback to 500 and log", async () => {
		const response = res();
		const next = jest.fn();
		errorHandler(new Error("boom"), {}, response, next);

		expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(response.json).toHaveBeenCalledWith({ message: "Internal server error" });
	});

	test("should omit details when none provided", () => {
		const response = res();
		const err = new AppError("fail", HttpStatus.BAD_REQUEST);

		errorHandler(err, {}, response, jest.fn());

		expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
		expect(response.json).toHaveBeenCalledWith({ message: "fail" });
	});
});
