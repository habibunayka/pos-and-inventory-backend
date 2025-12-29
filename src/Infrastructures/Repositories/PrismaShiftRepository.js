import Shift from "../../Domains/Shifts/Entities/Shift.js";
import ShiftRepository from "../../Domains/Shifts/Repositories/ShiftRepository.js";

export default class PrismaShiftRepository extends ShiftRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_SHIFT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.shift.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Shift.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.shift.findFirst({ where: { id, deletedAt: null } });
		return Shift.fromPersistence(record);
	}

	async createShift(data) {
		const record = await this._prisma.shift.create({ data });
		return Shift.fromPersistence(record);
	}

	async updateShift({ id, data }) {
		const existing = await this._prisma.shift.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.shift.update({ where: { id }, data });
		return Shift.fromPersistence(record);
	}

	async deleteShift(id) {
		const existing = await this._prisma.shift.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.shift.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
