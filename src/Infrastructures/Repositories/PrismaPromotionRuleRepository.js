import PromotionRuleRepository from '../../Domains/Promotions/Repositories/PromotionRuleRepository.js';

export default class PrismaPromotionRuleRepository extends PromotionRuleRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_PROMOTION_RULE_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.promotionRule.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.promotionRule.findUnique({ where: { id } }); }
  createPromotionRule(data) { return this._prisma.promotionRule.create({ data }); }
  async deletePromotionRule(id) { try { await this._prisma.promotionRule.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

