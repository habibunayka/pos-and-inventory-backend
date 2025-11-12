import PromotionRepository from '../../Domains/Promotions/Repositories/PromotionRepository.js';

export default class PrismaPromotionRepository extends PromotionRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_PROMOTION_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.promotion.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.promotion.findUnique({ where: { id } }); }
  createPromotion(data) { return this._prisma.promotion.create({ data }); }
  async updatePromotion({ id, data }) { try { return await this._prisma.promotion.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deletePromotion(id) { try { await this._prisma.promotion.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

