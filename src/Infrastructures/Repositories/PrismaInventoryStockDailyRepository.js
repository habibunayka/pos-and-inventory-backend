import InventoryStockDaily from "../../Domains/Stocks/Entities/InventoryStockDaily.js";
import InventoryStockDailyRepository from "../../Domains/Stocks/Repositories/InventoryStockDailyRepository.js";

export default class PrismaInventoryStockDailyRepository extends InventoryStockDailyRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_INVENTORY_STOCK_DAILY_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.inventoryStockDaily.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => InventoryStockDaily.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.inventoryStockDaily.findFirst({ where: { id, deletedAt: null } });
		return InventoryStockDaily.fromPersistence(record);
	}

	async createRecord(data) {
		const record = await this._prisma.inventoryStockDaily.create({ data });
		return InventoryStockDaily.fromPersistence(record);
	}

	async updateRecord({ id, data }) {
		const existing = await this._prisma.inventoryStockDaily.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.inventoryStockDaily.update({ where: { id }, data });
		return InventoryStockDaily.fromPersistence(record);
	}

	async deleteRecord(id) {
		const existing = await this._prisma.inventoryStockDaily.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.inventoryStockDaily.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
