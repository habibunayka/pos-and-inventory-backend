import SupplierProduct from "../../Domains/Suppliers/Entities/SupplierProduct.js";
import SupplierProductRepository from "../../Domains/Suppliers/Repositories/SupplierProductRepository.js";

export default class PrismaSupplierProductRepository extends SupplierProductRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_SUPPLIER_PRODUCT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.supplierProduct.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => SupplierProduct.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.supplierProduct.findFirst({ where: { id, deletedAt: null } });
		return SupplierProduct.fromPersistence(record);
	}

	async createSupplierProduct(data) {
		const record = await this._prisma.supplierProduct.create({ data });
		return SupplierProduct.fromPersistence(record);
	}

	async updateSupplierProduct({ id, data }) {
		const existing = await this._prisma.supplierProduct.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.supplierProduct.update({ where: { id }, data });
		return SupplierProduct.fromPersistence(record);
	}

	async deleteSupplierProduct(id) {
		const existing = await this._prisma.supplierProduct.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.supplierProduct.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
