import MenuVariant from "../../Domains/MenuVariants/Entities/MenuVariant.js";
import MenuVariantRepository from "../../Domains/MenuVariants/Repositories/MenuVariantRepository.js";

export default class PrismaMenuVariantRepository extends MenuVariantRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_MENUVARIANT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.menuVariant.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => MenuVariant.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.menuVariant.findFirst({ where: { id, deletedAt: null } });
		return MenuVariant.fromPersistence(record);
	}

	async createMenuVariant(data) {
		const record = await this._prisma.menuVariant.create({ data });
		return MenuVariant.fromPersistence(record);
	}

	async updateMenuVariant({ id, data }) {
		const existing = await this._prisma.menuVariant.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.menuVariant.update({ where: { id }, data });
		return MenuVariant.fromPersistence(record);
	}

	async deleteMenuVariant(id) {
		const existing = await this._prisma.menuVariant.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.menuVariant.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
