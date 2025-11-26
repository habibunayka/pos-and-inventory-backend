import LogoutUsecase from "../LogoutUsecase.js";
import HttpStatus from "../../../../Commons/Constants/HttpStatus.js";

describe("LogoutUsecase", () => {
	test("should return NO_CONTENT status", async () => {
		const usecase = new LogoutUsecase();

		const result = await usecase.execute();

		expect(result).toEqual({
			status: HttpStatus.NO_CONTENT
		});
	});
});
