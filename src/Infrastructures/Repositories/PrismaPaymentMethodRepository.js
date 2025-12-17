import PaymentMethod from "../../Domains/PaymentMethods/Entities/PaymentMethod.js";
import PaymentMethodRepository from "../../Domains/PaymentMethods/Repositories/PaymentMethodRepository.js";

export default class PrismaPaymentMethodRepository extends PaymentMethodRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_PAYMENTMETHOD_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.paymentMethod.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => PaymentMethod.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.paymentMethod.findFirst({ where: { id, deletedAt: null } });
		return PaymentMethod.fromPersistence(record);
	}

	async findByName(name) {
		if (!name) return null;
		const record = await this._prisma.paymentMethod.findFirst({ where: { name, deletedAt: null } });
		return PaymentMethod.fromPersistence(record);
	}

	async createPaymentMethod(data) {
		const record = await this._prisma.paymentMethod.create({ data });
		return PaymentMethod.fromPersistence(record);
	}

	async updatePaymentMethod({ id, data }) {
		const existing = await this._prisma.paymentMethod.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.paymentMethod.update({ where: { id }, data });
		return PaymentMethod.fromPersistence(record);
	}

	async deletePaymentMethod(id) {
		const existing = await this._prisma.paymentMethod.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.paymentMethod.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
