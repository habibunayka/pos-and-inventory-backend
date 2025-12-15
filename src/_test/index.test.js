import { jest } from "@jest/globals";

jest.unstable_mockModule("../Infrastructures/WebServer/ExpressServer.js", () => ({
	startServer: jest.fn()
}));

const { startServer } = await import("../Infrastructures/WebServer/ExpressServer.js");

describe("index.js", () => {
	test("should call startServer", async () => {
		await import("../index.js");

		expect(startServer).toHaveBeenCalledTimes(1);
	});
});
