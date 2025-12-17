import { describe, expect, it } from "@jest/globals";
import SystemLog from "../SystemLog.js";

describe("SystemLog", () => {
	it("returns null when record is missing", () => {
		expect(SystemLog.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			level: "level-value-2",
			message: "message-value-3",
			contextJson: "contextJson-value-4",
			createdAt: "createdAt-value-5"
		};

		const entity = SystemLog.fromPersistence(record);

		expect(entity).toBeInstanceOf(SystemLog);
		expect(entity).toMatchObject({
			id: "id-value-1",
			level: "level-value-2",
			message: "message-value-3",
			contextJson: "contextJson-value-4",
			createdAt: "createdAt-value-5"
		});
	});
});
