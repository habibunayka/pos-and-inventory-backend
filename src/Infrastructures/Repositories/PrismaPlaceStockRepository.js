import PlaceStock from "../../Domains/Stocks/Entities/PlaceStock.js";
import PlaceStockRepository from "../../Domains/Stocks/Repositories/PlaceStockRepository.js";

export default class PrismaPlaceStockRepository extends PlaceStockRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_PLACESTOCK_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.placeStock.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => PlaceStock.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.placeStock.findFirst({ where: { id, deletedAt: null } });
		return PlaceStock.fromPersistence(record);
	}

	async createPlaceStock(data) {
		const record = await this._prisma.placeStock.create({ data });
		return PlaceStock.fromPersistence(record);
	}

	async updatePlaceStock({ id, data }) {
		const existing = await this._prisma.placeStock.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.placeStock.update({ where: { id }, data });
		return PlaceStock.fromPersistence(record);
	}

	async deletePlaceStock(id) {
		const existing = await this._prisma.placeStock.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.placeStock.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
