import Shift from "../../Domains/Shifts/Entities/Shift.js";
import ShiftRepository from "../../Domains/Shifts/Repositories/ShiftRepository.js";

export default class PrismaShiftRepository extends ShiftRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_SHIFT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.shift.findMany({ orderBy: { id: "asc" } });
		return records.map((record) => Shift.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.shift.findUnique({ where: { id } });
		return Shift.fromPersistence(record);
	}

	async createShift(data) {
		const record = await this._prisma.shift.create({ data });
		return Shift.fromPersistence(record);
	}

	async updateShift({ id, data }) {
		try {
			const record = await this._prisma.shift.update({ where: { id }, data });
			return Shift.fromPersistence(record);
		} catch (error) {
			if (error?.code === "P2025") return null;
			throw error;
		}
	}

	async deleteShift(id) {
		try {
			await this._prisma.shift.delete({ where: { id } });
			return true;
		} catch (error) {
			if (error?.code === "P2025") return false;
			throw error;
		}
	}
}
