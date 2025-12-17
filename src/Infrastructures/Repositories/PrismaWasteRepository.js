import Waste from "../../Domains/Stocks/Entities/Waste.js";
import WasteRepository from "../../Domains/Stocks/Repositories/WasteRepository.js";

export default class PrismaWasteRepository extends WasteRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_WASTE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.waste.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Waste.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.waste.findFirst({ where: { id, deletedAt: null } });
		return Waste.fromPersistence(record);
	}

	async createWaste(data) {
		const record = await this._prisma.waste.create({ data });
		return Waste.fromPersistence(record);
	}

	async updateWaste({ id, data }) {
		const existing = await this._prisma.waste.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.waste.update({ where: { id }, data });
		return Waste.fromPersistence(record);
	}

	async deleteWaste(id) {
		const existing = await this._prisma.waste.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.waste.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
