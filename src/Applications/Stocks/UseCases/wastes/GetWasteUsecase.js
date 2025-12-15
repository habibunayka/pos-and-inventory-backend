import ValidationError from "../../../../Commons/Errors/ValidationError.js";

export default class GetWasteUsecase {
	constructor({ wasteService } = {}) {
		if (!wasteService) throw new Error("GET_WASTE.MISSING_SERVICE");
		this.wasteService = wasteService;
	}
	async execute(id) {
		const intId = Number(id);
		if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError("id must be a positive integer");
		const rec = await this.wasteService.getWaste(intId);
		if (!rec) throw new ValidationError("Waste not found");
		return rec;
	}
}
