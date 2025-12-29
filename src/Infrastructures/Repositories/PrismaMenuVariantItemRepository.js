import MenuVariantItem from "../../Domains/MenuVariantItems/Entities/MenuVariantItem.js";
import MenuVariantItemRepository from "../../Domains/MenuVariantItems/Repositories/MenuVariantItemRepository.js";

export default class PrismaMenuVariantItemRepository extends MenuVariantItemRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_MENUVARIANTITEM_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.menuVariantItem.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => MenuVariantItem.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.menuVariantItem.findFirst({ where: { id, deletedAt: null } });
		return MenuVariantItem.fromPersistence(record);
	}

	async createMenuVariantItem(data) {
		const record = await this._prisma.menuVariantItem.create({ data });
		return MenuVariantItem.fromPersistence(record);
	}

	async updateMenuVariantItem({ id, data }) {
		const existing = await this._prisma.menuVariantItem.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.menuVariantItem.update({ where: { id }, data });
		return MenuVariantItem.fromPersistence(record);
	}

	async deleteMenuVariantItem(id) {
		const existing = await this._prisma.menuVariantItem.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.menuVariantItem.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
