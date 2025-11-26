import Station from "../../Domains/Stations/Entities/Station.js";
import StationRepository from "../../Domains/Stations/Repositories/StationRepository.js";

export default class PrismaStationRepository extends StationRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_STATION_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.station.findMany({ orderBy: { id: "asc" } });
		return records.map((record) => Station.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.station.findUnique({ where: { id } });
		return Station.fromPersistence(record);
	}

	async createStation(data) {
		const record = await this._prisma.station.create({ data });
		return Station.fromPersistence(record);
	}

	async updateStation({ id, data }) {
		try {
			const record = await this._prisma.station.update({ where: { id }, data });
			return Station.fromPersistence(record);
		} catch (error) {
			if (error?.code === "P2025") return null;
			throw error;
		}
	}

	async deleteStation(id) {
		try {
			await this._prisma.station.delete({ where: { id } });
			return true;
		} catch (error) {
			if (error?.code === "P2025") return false;
			throw error;
		}
	}
}
