import TransactionItemVariant from "../../Domains/Transactions/Entities/TransactionItemVariant.js";
import TransactionItemVariantRepository from "../../Domains/Transactions/Repositories/TransactionItemVariantRepository.js";

export default class PrismaTransactionItemVariantRepository extends TransactionItemVariantRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_TRANSACTION_ITEM_VARIANT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.transactionItemVariant.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" },
			include: { menuVariant: true }
		});
		return records.map((record) => TransactionItemVariant.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.transactionItemVariant.findFirst({
			where: { id, deletedAt: null },
			include: { menuVariant: true }
		});
		return TransactionItemVariant.fromPersistence(record);
	}

	async createVariant(data) {
		const record = await this._prisma.transactionItemVariant.create({ data });
		return TransactionItemVariant.fromPersistence(record);
	}

	async deleteVariant(id) {
		const existing = await this._prisma.transactionItemVariant.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.transactionItemVariant.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
