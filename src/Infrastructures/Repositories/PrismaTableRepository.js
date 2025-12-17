import Table from "../../Domains/Tables/Entities/Table.js";
import TableRepository from "../../Domains/Tables/Repositories/TableRepository.js";

export default class PrismaTableRepository extends TableRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_TABLE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.table.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Table.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.table.findFirst({ where: { id, deletedAt: null } });
		return Table.fromPersistence(record);
	}

	async createTable(tableData) {
		const record = await this._prisma.table.create({ data: tableData });
		return Table.fromPersistence(record);
	}

	async updateTable({ id, tableData }) {
		const existing = await this._prisma.table.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.table.update({ where: { id }, data: tableData });
		return Table.fromPersistence(record);
	}

	async deleteTable(id) {
		const existing = await this._prisma.table.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.table.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
