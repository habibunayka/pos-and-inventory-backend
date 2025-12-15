import * as usecases from "../index.js";
import ListPaymentMethodsUsecase from "../ListPaymentMethodsUsecase.js";
import GetPaymentMethodUsecase from "../GetPaymentMethodUsecase.js";
import CreatePaymentMethodUsecase from "../CreatePaymentMethodUsecase.js";
import UpdatePaymentMethodUsecase from "../UpdatePaymentMethodUsecase.js";
import DeletePaymentMethodUsecase from "../DeletePaymentMethodUsecase.js";

describe("PaymentMethods Usecases index exports", () => {
	test("should export ListPaymentMethodsUsecase", () => {
		expect(usecases.ListPaymentMethodsUsecase).toBe(ListPaymentMethodsUsecase);
	});

	test("should export GetPaymentMethodUsecase", () => {
		expect(usecases.GetPaymentMethodUsecase).toBe(GetPaymentMethodUsecase);
	});

	test("should export CreatePaymentMethodUsecase", () => {
		expect(usecases.CreatePaymentMethodUsecase).toBe(CreatePaymentMethodUsecase);
	});

	test("should export UpdatePaymentMethodUsecase", () => {
		expect(usecases.UpdatePaymentMethodUsecase).toBe(UpdatePaymentMethodUsecase);
	});

	test("should export DeletePaymentMethodUsecase", () => {
		expect(usecases.DeletePaymentMethodUsecase).toBe(DeletePaymentMethodUsecase);
	});
});
