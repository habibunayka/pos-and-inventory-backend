import Package from "../../Domains/Packages/Entities/Package.js";
import PackageRepository from "../../Domains/Packages/Repositories/PackageRepository.js";

export default class PrismaPackageRepository extends PackageRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_PACKAGE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.package.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Package.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.package.findFirst({ where: { id, deletedAt: null } });
		return Package.fromPersistence(record);
	}

	async findByName(name) {
		if (!name) return null;
		const record = await this._prisma.package.findFirst({ where: { name, deletedAt: null } });
		return Package.fromPersistence(record);
	}

	async createPackage(packageData) {
		const record = await this._prisma.package.create({ data: packageData });
		return Package.fromPersistence(record);
	}

	async updatePackage({ id, data }) {
		const existing = await this._prisma.package.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.package.update({ where: { id }, data });
		return Package.fromPersistence(record);
	}

	async deletePackage(id) {
		const existing = await this._prisma.package.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.package.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
