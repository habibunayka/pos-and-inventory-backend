import StockTransferRepository from '../../Domains/Stocks/Repositories/StockTransferRepository.js';

export default class PrismaStockTransferRepository extends StockTransferRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_STOCK_TRANSFER_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.stockTransfer.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.stockTransfer.findUnique({ where: { id } }); }
  createTransfer(data) { return this._prisma.stockTransfer.create({ data }); }
  async deleteTransfer(id) { try { await this._prisma.stockTransfer.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

