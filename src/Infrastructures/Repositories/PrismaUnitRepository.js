import Unit from "../../Domains/Units/Entities/Unit.js";
import UnitRepository from "../../Domains/Units/Repositories/UnitRepository.js";

export default class PrismaUnitRepository extends UnitRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_UNIT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.unit.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Unit.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.unit.findFirst({ where: { id, deletedAt: null } });
		return Unit.fromPersistence(record);
	}

	async findByName(name) {
		if (!name) return null;
		const record = await this._prisma.unit.findFirst({ where: { name, deletedAt: null } });
		return Unit.fromPersistence(record);
	}

	async createUnit(unitData) {
		const record = await this._prisma.unit.create({ data: unitData });
		return Unit.fromPersistence(record);
	}

	async updateUnit({ id, unitData }) {
		const existing = await this._prisma.unit.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.unit.update({ where: { id }, data: unitData });
		return Unit.fromPersistence(record);
	}

	async deleteUnit(id) {
		const existing = await this._prisma.unit.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.unit.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
