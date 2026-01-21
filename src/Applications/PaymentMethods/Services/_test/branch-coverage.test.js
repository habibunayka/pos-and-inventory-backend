import { describe, expect, it } from "@jest/globals";
import PaymentMethodService from "../PaymentMethodService.js";
import PaymentMethodRepository from "../../../../Domains/PaymentMethods/Repositories/PaymentMethodRepository.js";

describe("PaymentMethodService constructor coverage", () => {
	it("accepts repository instance", () => {
		const repo = new PaymentMethodRepository();
		const service = new PaymentMethodService({ paymentMethodRepository: repo });
		expect(service).toBeInstanceOf(PaymentMethodService);
	});
});
