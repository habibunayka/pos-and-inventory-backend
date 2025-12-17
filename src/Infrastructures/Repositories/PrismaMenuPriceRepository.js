import MenuPrice from "../../Domains/MenuPrices/Entities/MenuPrice.js";
import MenuPriceRepository from "../../Domains/MenuPrices/Repositories/MenuPriceRepository.js";

export default class PrismaMenuPriceRepository extends MenuPriceRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_MENUPRICE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.menuPrice.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => MenuPrice.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.menuPrice.findFirst({ where: { id, deletedAt: null } });
		return MenuPrice.fromPersistence(record);
	}

	async createMenuPrice(data) {
		const record = await this._prisma.menuPrice.create({ data });
		return MenuPrice.fromPersistence(record);
	}

	async updateMenuPrice({ id, data }) {
		const existing = await this._prisma.menuPrice.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.menuPrice.update({ where: { id }, data });
		return MenuPrice.fromPersistence(record);
	}

	async deleteMenuPrice(id) {
		const existing = await this._prisma.menuPrice.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.menuPrice.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
