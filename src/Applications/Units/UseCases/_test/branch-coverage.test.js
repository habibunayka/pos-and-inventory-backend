import { describe, expect, it, jest } from "@jest/globals";
import ValidationError from "../../../../Commons/Errors/ValidationError.js";
import CreateUnitUsecase from "../CreateUnitUsecase.js";
import UpdateUnitUsecase from "../UpdateUnitUsecase.js";

describe("Units usecase branch coverage", () => {
	it("CreateUnitUsecase default arg branch", async () => {
		const usecase = new CreateUnitUsecase({ unitService: { getUnitByName: jest.fn(), createUnit: jest.fn() } });
		await expect(usecase.execute()).rejects.toThrow(ValidationError);
	});

	it("UpdateUnitUsecase handles defaults and empty abbreviation", async () => {
		const unitService = {
			getUnit: jest.fn().mockResolvedValue({ id: 1 }),
			updateUnit: jest.fn().mockResolvedValue({ id: 1 })
		};
		const usecase = new UpdateUnitUsecase({ unitService });
		await expect(usecase.execute(1)).rejects.toThrow(ValidationError);

		await expect(usecase.execute(1, { abbreviation: null })).rejects.toThrow(
			new ValidationError("abbreviation cannot be empty")
		);
	});
});
