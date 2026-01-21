import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreatePaymentMethodUsecase from "../CreatePaymentMethodUsecase.js";
import UpdatePaymentMethodUsecase from "../UpdatePaymentMethodUsecase.js";

describe("PaymentMethods usecase branch coverage", () => {
	it("CreatePaymentMethodUsecase default arg branch", async () => {
		const service = { getPaymentMethodByName: jest.fn().mockResolvedValue(null), createPaymentMethod: jest.fn() };
		const usecase = new CreatePaymentMethodUsecase({ paymentMethodService: service });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdatePaymentMethodUsecase default arg branch", async () => {
		const service = { getPaymentMethod: jest.fn().mockResolvedValue({ id: 1 }), updatePaymentMethod: jest.fn() };
		const usecase = new UpdatePaymentMethodUsecase({ paymentMethodService: service });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);
	});
});
