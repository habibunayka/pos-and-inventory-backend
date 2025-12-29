import Transaction from "../../Domains/Transactions/Entities/Transaction.js";
import TransactionRepository from "../../Domains/Transactions/Repositories/TransactionRepository.js";

export default class PrismaTransactionRepository extends TransactionRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_TRANSACTION_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.transaction.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" },
			include: {
				items: {
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
				}
			}
		});
		return records.map((record) => Transaction.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.transaction.findFirst({
			where: { id, deletedAt: null },
			include: {
				items: {
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
				}
			}
		});
		return Transaction.fromPersistence(record);
	}

	async createTransaction(data) {
		const record = await this._prisma.transaction.create({ data });
		return Transaction.fromPersistence(record);
	}

	async updateTransaction({ id, data }) {
		const existing = await this._prisma.transaction.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.transaction.update({ where: { id }, data });
		return Transaction.fromPersistence(record);
	}

	async deleteTransaction(id) {
		const existing = await this._prisma.transaction.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.transaction.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
