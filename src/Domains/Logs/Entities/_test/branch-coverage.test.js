import { describe, expect, it } from "@jest/globals";
import ActivityLog from "../ActivityLog.js";
import SystemLog from "../SystemLog.js";

describe("Logs entity branch coverage", () => {
	it.each([ActivityLog, SystemLog])("returns null when persistence record is missing for %p", (Entity) => {
		expect(Entity.fromPersistence(null)).toBeNull();
	});

	it("ActivityLog defaults to nulls for optional props", () => {
		const entity = ActivityLog.fromPersistence({
			action: "login",
			createdAt: "2024"
		});

		expect(entity).toMatchObject({
			id: null,
			userId: null,
			entityType: null,
			entityId: null,
			contextJson: null
		});
	});

	it("SystemLog defaults to nulls", () => {
		const entity = SystemLog.fromPersistence({ level: "info", message: "msg", createdAt: "now" });
		expect(entity).toMatchObject({ id: null, contextJson: null });
	});

	it("SystemLog handles missing level", () => {
		const entity = SystemLog.fromPersistence({ message: "msg", createdAt: "now" });
		expect(entity).toMatchObject({ level: null });
	});

	describe("constructor default branches", () => {
		const cases = [
			{
				Entity: ActivityLog,
				props: { action: "do", createdAt: "now" },
				expected: { userId: null, entityType: null, entityId: null }
			},
			{
				Entity: SystemLog,
				props: { message: "msg", createdAt: "now" },
				expected: { level: null, contextJson: null }
			}
		];

		it.each(cases)("applies defaults for %p", ({ Entity, props, expected }) => {
			const entity = new Entity(props);
			expect(entity).toBeInstanceOf(Entity);
			expect(entity).toMatchObject(expected);
		});
	});
});
