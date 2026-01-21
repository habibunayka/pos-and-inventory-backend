import { describe, expect, it } from "@jest/globals";
import PaymentMethod from "../PaymentMethod.js";

describe("PaymentMethod entity branch coverage", () => {
	it("returns null when persistence record is missing", () => {
		expect(PaymentMethod.fromPersistence(null)).toBeNull();
	});

	it("PaymentMethod uses default active flag", () => {
		const entity = PaymentMethod.fromPersistence({ name: "cash" });
		expect(entity).toMatchObject({ id: null, description: null, isActive: true });
	});

	describe("constructor default branches", () => {
		it("applies defaults when fields missing", () => {
			const entity = new PaymentMethod({ name: "Cash" });
			expect(entity).toBeInstanceOf(PaymentMethod);
			expect(entity).toMatchObject({ description: null, isActive: true });
		});
	});
});
