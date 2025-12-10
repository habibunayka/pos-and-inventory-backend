import { jest } from "@jest/globals";
import adapt from "../ExpressAdapter.js";
import HttpStatus from "../../../Commons/Constants/HttpStatus.js";

const createRes = () => {
	const res = {};
	res.status = jest.fn().mockImplementation(() => res);
	res.json = jest.fn().mockImplementation(() => res);
	res.end = jest.fn().mockImplementation(() => res);
	return res;
};

describe("ExpressAdapter", () => {
	test("should send JSON when handler returns data", async () => {
		const handler = jest.fn().mockResolvedValue({ status: HttpStatus.CREATED, data: { ok: true } });
		const res = createRes();
		const req = { body: { a: 1 }, params: { id: "1" }, query: { q: "1" }, user: { id: 1 } };

		await adapt(handler)(req, res, jest.fn());

		expect(handler).toHaveBeenCalledWith(req);
		expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
		expect(res.json).toHaveBeenCalledWith({ ok: true });
	});

	test("should default status to 200 when not provided", async () => {
		const handler = jest.fn().mockResolvedValue({ data: { ok: "default" } });
		const res = createRes();

		await adapt(handler)({ body: {}, params: {}, query: {} }, res, jest.fn());

		expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
		expect(res.json).toHaveBeenCalledWith({ ok: "default" });
	});

	test("should end with 204 when handler returns falsy", async () => {
		const res = createRes();
		await adapt(jest.fn().mockResolvedValue(null))({ body: {}, params: {}, query: {} }, res, jest.fn());

		expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
		expect(res.end).toHaveBeenCalled();
	});

	test("should end without body when data is undefined", async () => {
		const res = createRes();
		await adapt(jest.fn().mockResolvedValue({ status: HttpStatus.CREATED }))({ body: {} }, res, jest.fn());

		expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
		expect(res.end).toHaveBeenCalled();
	});

	test("should forward errors to next", async () => {
		const error = new Error("boom");
		const next = jest.fn();
		await adapt(jest.fn().mockRejectedValue(error))({ body: {} }, createRes(), next);

		expect(next).toHaveBeenCalledWith(error);
	});
});
