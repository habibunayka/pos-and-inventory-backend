import PromotionRule from "../../Domains/Promotions/Entities/PromotionRule.js";
import PromotionRuleRepository from "../../Domains/Promotions/Repositories/PromotionRuleRepository.js";

export default class PrismaPromotionRuleRepository extends PromotionRuleRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_PROMOTION_RULE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.promotionRule.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => PromotionRule.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.promotionRule.findFirst({ where: { id, deletedAt: null } });
		return PromotionRule.fromPersistence(record);
	}

	async createPromotionRule(data) {
		const record = await this._prisma.promotionRule.create({ data });
		return PromotionRule.fromPersistence(record);
	}

	async deletePromotionRule(id) {
		const existing = await this._prisma.promotionRule.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.promotionRule.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
