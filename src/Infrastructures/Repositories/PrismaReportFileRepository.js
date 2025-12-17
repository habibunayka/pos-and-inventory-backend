import ReportFile from "../../Domains/ReportFiles/Entities/ReportFile.js";
import ReportFileRepository from "../../Domains/ReportFiles/Repositories/ReportFileRepository.js";

export default class PrismaReportFileRepository extends ReportFileRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_REPORTFILE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.reportFile.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => ReportFile.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.reportFile.findFirst({ where: { id, deletedAt: null } });
		return ReportFile.fromPersistence(record);
	}

	async createReportFile(data) {
		const record = await this._prisma.reportFile.create({ data });
		return ReportFile.fromPersistence(record);
	}

	async updateReportFile({ id, data }) {
		const existing = await this._prisma.reportFile.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.reportFile.update({ where: { id }, data });
		return ReportFile.fromPersistence(record);
	}

	async deleteReportFile(id) {
		const existing = await this._prisma.reportFile.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.reportFile.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
