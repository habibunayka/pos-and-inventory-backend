export default class ListWastesUsecase {
	constructor({ wasteService } = {}) {
		if (!wasteService) throw new Error("LIST_WASTE.MISSING_SERVICE");
		this.wasteService = wasteService;
	}
	async execute() {
		return this.wasteService.listWastes();
	}
}
