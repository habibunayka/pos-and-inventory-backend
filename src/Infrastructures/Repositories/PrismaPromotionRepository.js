import Promotion from "../../Domains/Promotions/Entities/Promotion.js";
import PromotionRepository from "../../Domains/Promotions/Repositories/PromotionRepository.js";

export default class PrismaPromotionRepository extends PromotionRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_PROMOTION_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.promotion.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Promotion.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.promotion.findFirst({ where: { id, deletedAt: null } });
		return Promotion.fromPersistence(record);
	}

	async createPromotion(data) {
		const record = await this._prisma.promotion.create({ data });
		return Promotion.fromPersistence(record);
	}

	async updatePromotion({ id, data }) {
		const existing = await this._prisma.promotion.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.promotion.update({ where: { id }, data });
		return Promotion.fromPersistence(record);
	}

	async deletePromotion(id) {
		const existing = await this._prisma.promotion.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.promotion.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
