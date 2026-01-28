import Category from "../../Domains/Categories/Entities/Category.js";
import CategoryRepository from "../../Domains/Categories/Repositories/CategoryRepository.js";

export default class PrismaCategoryRepository extends CategoryRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_CATEGORY_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll({ type } = {}) {
		const where = { deletedAt: null };
		if (type) {
			where.type = type;
		}
		const records = await this._prisma.category.findMany({
			where,
			orderBy: { id: "asc" }
		});
		return records.map((record) => Category.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.category.findFirst({ where: { id, deletedAt: null } });
		return Category.fromPersistence(record);
	}

	async findByName(name, type = null) {
		if (!name) return null;
		const where = { name, deletedAt: null };
		if (type) {
			where.type = type;
		}
		const record = await this._prisma.category.findFirst({ where });
		return Category.fromPersistence(record);
	}

	async createCategory(data) {
		const record = await this._prisma.category.create({ data });
		return Category.fromPersistence(record);
	}

	async updateCategory({ id, data }) {
		const existing = await this._prisma.category.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.category.update({ where: { id }, data });
		return Category.fromPersistence(record);
	}

	async deleteCategory(id) {
		const existing = await this._prisma.category.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.category.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
