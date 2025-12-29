import StockTransfer from "../../Domains/Stocks/Entities/StockTransfer.js";
import StockTransferRepository from "../../Domains/Stocks/Repositories/StockTransferRepository.js";

export default class PrismaStockTransferRepository extends StockTransferRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_STOCK_TRANSFER_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.stockTransfer.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => StockTransfer.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.stockTransfer.findFirst({ where: { id, deletedAt: null } });
		return StockTransfer.fromPersistence(record);
	}

	async createTransfer(data) {
		const record = await this._prisma.stockTransfer.create({ data });
		return StockTransfer.fromPersistence(record);
	}

	async deleteTransfer(id) {
		const existing = await this._prisma.stockTransfer.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.stockTransfer.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
