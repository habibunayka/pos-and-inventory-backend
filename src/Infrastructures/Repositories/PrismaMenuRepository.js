import Menu from "../../Domains/Menus/Entities/Menu.js";
import MenuRepository from "../../Domains/Menus/Repositories/MenuRepository.js";

export default class PrismaMenuRepository extends MenuRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_MENU_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.menu.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Menu.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.menu.findFirst({ where: { id, deletedAt: null } });
		return Menu.fromPersistence(record);
	}

	async createMenu(data) {
		const record = await this._prisma.menu.create({ data });
		return Menu.fromPersistence(record);
	}

	async updateMenu({ id, data }) {
		const existing = await this._prisma.menu.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.menu.update({ where: { id }, data });
		return Menu.fromPersistence(record);
	}

	async deleteMenu(id) {
		const existing = await this._prisma.menu.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.menu.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
