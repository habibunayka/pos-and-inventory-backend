import KitchenOrder from "../../Domains/Transactions/Entities/KitchenOrder.js";
import KitchenOrderRepository from "../../Domains/Transactions/Repositories/KitchenOrderRepository.js";

export default class PrismaKitchenOrderRepository extends KitchenOrderRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_KITCHEN_ORDER_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.kitchenOrder.findMany({
			where: { deletedAt: null, status: { in: ["queued", "proses", "done"] } },
			orderBy: { id: "asc" }
		});
		return records.map((record) => KitchenOrder.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.kitchenOrder.findFirst({ where: { id, deletedAt: null } });
		return KitchenOrder.fromPersistence(record);
	}

	async findByTransactionId(transactionId) {
		const records = await this._prisma.kitchenOrder.findMany({
			where: {
				deletedAt: null,
				status: { in: ["queued", "proses", "done"] },
				transactionItem: { transactionId }
			},
			orderBy: { id: "asc" }
		});
		return records.map((record) => KitchenOrder.fromPersistence(record));
	}

	async createKitchenOrder(data) {
		const record = await this._prisma.kitchenOrder.create({ data });
		return KitchenOrder.fromPersistence(record);
	}

	async updateKitchenOrder({ id, data }) {
		const existing = await this._prisma.kitchenOrder.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.kitchenOrder.update({ where: { id }, data });
		return KitchenOrder.fromPersistence(record);
	}

	async deleteKitchenOrder(id) {
		const existing = await this._prisma.kitchenOrder.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.kitchenOrder.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
