import WasteRepository from '../../Domains/Stocks/Repositories/WasteRepository.js';

export default class PrismaWasteRepository extends WasteRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_WASTE_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.waste.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.waste.findUnique({ where: { id } }); }
  createWaste(data) { return this._prisma.waste.create({ data }); }
  async updateWaste({ id, data }) { try { return await this._prisma.waste.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deleteWaste(id) { try { await this._prisma.waste.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

