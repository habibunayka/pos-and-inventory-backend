import CashierShift from "../../Domains/CashierShifts/Entities/CashierShift.js";
import CashierShiftRepository from "../../Domains/CashierShifts/Repositories/CashierShiftRepository.js";

export default class PrismaCashierShiftRepository extends CashierShiftRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_CASHIER_SHIFT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.cashierShift.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => CashierShift.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.cashierShift.findFirst({ where: { id, deletedAt: null } });
		return CashierShift.fromPersistence(record);
	}

	async createShift(data) {
		const record = await this._prisma.cashierShift.create({ data });
		return CashierShift.fromPersistence(record);
	}

	async updateShift({ id, data }) {
		const existing = await this._prisma.cashierShift.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.cashierShift.update({ where: { id }, data });
		return CashierShift.fromPersistence(record);
	}

	async deleteShift(id) {
		const existing = await this._prisma.cashierShift.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.cashierShift.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
