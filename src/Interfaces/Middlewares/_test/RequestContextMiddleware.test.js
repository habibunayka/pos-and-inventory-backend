import { jest } from "@jest/globals";
import requestContextMiddleware from "../RequestContextMiddleware.js";
import { getRequestContext } from "../../../Infrastructures/Context/RequestContext.js";

describe("RequestContextMiddleware", () => {
	test("should invoke next and not throw", () => {
		const next = jest.fn(() => {
			const context = getRequestContext();
			expect(context.requestId).toBe("req-id");
			expect(context.metadata).toEqual({ method: "POST", path: "/test" });
		});
		const req = {
			get: () => "req-id",
			method: "POST",
			path: "/test"
		};

		requestContextMiddleware(req, {}, next);
		expect(next).toHaveBeenCalled();
	});

	test("should fallback to headers when getter unavailable", () => {
		const next = jest.fn(() => {
			const context = getRequestContext();
			expect(context.requestId).toBe("header-id");
			expect(context.metadata).toEqual({ method: "GET", path: "/headers" });
		});
		const req = {
			headers: { "x-request-id": "header-id" },
			method: "GET",
			path: "/headers"
		};

		requestContextMiddleware(req, {}, next);
		expect(next).toHaveBeenCalled();
	});
});
