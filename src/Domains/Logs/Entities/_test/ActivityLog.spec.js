import { describe, expect, it } from "@jest/globals";
import ActivityLog from "../ActivityLog.js";

describe("ActivityLog", () => {
	it("returns null when record is missing", () => {
		expect(ActivityLog.fromPersistence(null)).toBeNull();
	});

	it("maps persistence record to entity", () => {
		const record = {
			id: "id-value-1",
			userId: "userId-value-2",
			action: "action-value-3",
			entityType: "entityType-value-4",
			entityId: "entityId-value-5",
			contextJson: "contextJson-value-6",
			createdAt: "createdAt-value-7"
		};

		const entity = ActivityLog.fromPersistence(record);

		expect(entity).toBeInstanceOf(ActivityLog);
		expect(entity).toMatchObject({
			id: "id-value-1",
			userId: "userId-value-2",
			action: "action-value-3",
			entityType: "entityType-value-4",
			entityId: "entityId-value-5",
			contextJson: "contextJson-value-6",
			createdAt: "createdAt-value-7"
		});
	});

});
