import CashierShiftRepository from '../../Domains/CashierShifts/Repositories/CashierShiftRepository.js';

export default class PrismaCashierShiftRepository extends CashierShiftRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_CASHIER_SHIFT_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.cashierShift.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.cashierShift.findUnique({ where: { id } }); }
  createShift(data) { return this._prisma.cashierShift.create({ data }); }
  async updateShift({ id, data }) { try { return await this._prisma.cashierShift.update({ where: { id }, data }); } catch (e) { if (e?.code==='P2025') return null; throw e; } }
  async deleteShift(id) { try { await this._prisma.cashierShift.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

