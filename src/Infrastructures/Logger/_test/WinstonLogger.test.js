import { jest } from "@jest/globals";
import logger from "../WinstonLogger.js";

describe("WinstonLogger", () => {
	beforeEach(() => {
		jest.spyOn(console, "log").mockImplementation(() => {});
		jest.spyOn(console, "warn").mockImplementation(() => {});
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test("logs messages with and without metadata", () => {
		logger.info("hello");
		expect(console.log).toHaveBeenCalledWith("[INFO] hello");

		logger.info("hello-meta", { a: 1 });
		expect(console.log).toHaveBeenCalledWith("[INFO] hello-meta", { a: 1 });

		logger.warn("warn-only");
		expect(console.warn).toHaveBeenCalledWith("[WARN] warn-only");

		logger.warn("warn-meta", { b: 2 });
		expect(console.warn).toHaveBeenCalledWith("[WARN] warn-meta", { b: 2 });

		logger.error("error-only");
		expect(console.error).toHaveBeenCalledWith("[ERROR] error-only");

		logger.error("error-meta", { c: 3 });
		expect(console.error).toHaveBeenCalledWith("[ERROR] error-meta", { c: 3 });
	});
});
