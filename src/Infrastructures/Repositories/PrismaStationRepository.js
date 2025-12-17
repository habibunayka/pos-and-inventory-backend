import Station from "../../Domains/Stations/Entities/Station.js";
import StationRepository from "../../Domains/Stations/Repositories/StationRepository.js";

export default class PrismaStationRepository extends StationRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_STATION_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.station.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Station.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.station.findFirst({ where: { id, deletedAt: null } });
		return Station.fromPersistence(record);
	}

	async createStation(data) {
		const record = await this._prisma.station.create({ data });
		return Station.fromPersistence(record);
	}

	async updateStation({ id, data }) {
		const existing = await this._prisma.station.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.station.update({ where: { id }, data });
		return Station.fromPersistence(record);
	}

	async deleteStation(id) {
		const existing = await this._prisma.station.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.station.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
