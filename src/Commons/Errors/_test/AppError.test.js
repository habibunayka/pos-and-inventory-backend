import { describe, expect, it } from "@jest/globals";
import AppError from "../AppError.js";
import HttpStatus from "../../Constants/HttpStatus.js";

describe("AppError", () => {
	it("uses defaults when details are omitted", () => {
		const error = new AppError("boom");
		expect(error.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(error.details).toBeUndefined();
	});

	it("allows overriding status and details", () => {
		const error = new AppError("bad", HttpStatus.BAD_REQUEST, { meta: true });
		expect(error.statusCode).toBe(HttpStatus.BAD_REQUEST);
		expect(error.details).toEqual({ meta: true });
	});
});
