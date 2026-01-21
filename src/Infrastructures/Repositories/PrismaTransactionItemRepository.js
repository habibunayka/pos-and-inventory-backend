import TransactionItem from "../../Domains/Transactions/Entities/TransactionItem.js";
import TransactionItemRepository from "../../Domains/Transactions/Repositories/TransactionItemRepository.js";

const defaultInclude = {
	menu: true,
	cost: true,
	variants: {
		where: { deletedAt: null },
		orderBy: { id: "asc" },
		include: { menuVariant: true }
	}
};

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
			include: defaultInclude
		});
		return records.map((record) => TransactionItem.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.transactionItem.findFirst({
			where: { id, deletedAt: null },
			include: defaultInclude
		});
		return TransactionItem.fromPersistence(record);
	}

	async createItem(data) {
		const { totalCost, ...itemData } = data;
		const hasCost = totalCost !== undefined && totalCost !== null;

		const createdId = await this._prisma.$transaction(async (tx) => {
			const created = await tx.transactionItem.create({ data: itemData });

			if (hasCost) {
				await tx.transactionItemCost.upsert({
					where: { transactionItemId: created.id },
					update: { totalCost, deletedAt: null },
					create: { transactionItemId: created.id, totalCost }
				});
			}

			return created.id;
		});

		return this.findById(createdId);
	}

	async updateItem({ id, data }) {
		const existing = await this._prisma.transactionItem.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;

		const { totalCost, ...itemData } = data;
		const hasCost = totalCost !== undefined && totalCost !== null;

		await this._prisma.$transaction(async (tx) => {
			if (Object.keys(itemData).length) {
				await tx.transactionItem.update({ where: { id }, data: itemData });
			}

			if (hasCost) {
				await tx.transactionItemCost.upsert({
					where: { transactionItemId: id },
					update: { totalCost, deletedAt: null },
					create: { transactionItemId: id, totalCost }
				});
			}
		});

		return this.findById(id);
	}

	async deleteItem(id) {
		const existing = await this._prisma.transactionItem.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;

		await this._prisma.$transaction(async (tx) => {
			await tx.transactionItem.update({ where: { id }, data: { deletedAt: new Date() } });
			await tx.transactionItemCost.updateMany({
				where: { transactionItemId: id, deletedAt: null },
				data: { deletedAt: new Date() }
			});
		});

		return true;
	}
}
