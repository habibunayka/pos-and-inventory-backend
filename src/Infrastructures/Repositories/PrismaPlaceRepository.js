import PlaceRepository from "../../Domains/Places/Repositories/PlaceRepository.js";

export default class PrismaPlaceRepository extends PlaceRepository {
	constructor({ prisma } = {}) {
		super();

		if (!prisma) {
			throw new Error("PRISMA_PLACE_REPOSITORY.MISSING_CLIENT");
		}

		this._prisma = prisma;
	}

	async findAll() {
		return this._prisma.place.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
	}

	async findById(id) {
		return this._prisma.place.findFirst({ where: { id, deletedAt: null } });
	}

	async createPlace({ placeData }) {
		return this._prisma.place.create({
			data: placeData
		});
	}

	async updatePlace({ id, placeData }) {
		const existing = await this._prisma.place.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		return this._prisma.place.update({
			where: { id },
			data: placeData
		});
	}

	async deletePlace(id) {
		const existing = await this._prisma.place.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.place.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
