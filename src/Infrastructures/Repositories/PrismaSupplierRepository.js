import Supplier from "../../Domains/Suppliers/Entities/Supplier.js";
import SupplierRepository from "../../Domains/Suppliers/Repositories/SupplierRepository.js";

export default class PrismaSupplierRepository extends SupplierRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_SUPPLIER_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.supplier.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Supplier.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.supplier.findFirst({ where: { id, deletedAt: null } });
		return Supplier.fromPersistence(record);
	}

	async createSupplier(data) {
		const record = await this._prisma.supplier.create({ data });
		return Supplier.fromPersistence(record);
	}

	async updateSupplier({ id, data }) {
		const existing = await this._prisma.supplier.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.supplier.update({ where: { id }, data });
		return Supplier.fromPersistence(record);
	}

	async deleteSupplier(id) {
		const existing = await this._prisma.supplier.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.supplier.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
