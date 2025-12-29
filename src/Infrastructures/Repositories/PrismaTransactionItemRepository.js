import TransactionItem from "../../Domains/Transactions/Entities/TransactionItem.js";
import TransactionItemRepository from "../../Domains/Transactions/Repositories/TransactionItemRepository.js";

export default class PrismaTransactionItemRepository extends TransactionItemRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_TRANSACTION_ITEM_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.transactionItem.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" },
			include: {
				menu: true,
				variants: {
					where: { deletedAt: null },
					orderBy: { id: "asc" },
					include: { menuVariant: true }
				}
			}
		});
		return records.map((record) => TransactionItem.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.transactionItem.findFirst({
			where: { id, deletedAt: null },
			include: {
				menu: true,
				variants: {
					where: { deletedAt: null },
					orderBy: { id: "asc" },
					include: { menuVariant: true }
				}
			}
		});
		return TransactionItem.fromPersistence(record);
	}

	async createItem(data) {
		const record = await this._prisma.transactionItem.create({ data });
		return TransactionItem.fromPersistence(record);
	}

	async updateItem({ id, data }) {
		const existing = await this._prisma.transactionItem.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.transactionItem.update({ where: { id }, data });
		return TransactionItem.fromPersistence(record);
	}

	async deleteItem(id) {
		const existing = await this._prisma.transactionItem.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.transactionItem.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
