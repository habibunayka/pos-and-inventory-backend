export default class CreateStockAdjustmentUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository) throw new Error('CreateStockAdjustmentUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute(payload) {
    const { warehouseId, productId, difference, reason } = payload ?? {};
    if (!warehouseId || !productId || typeof difference !== 'number') {
      throw new Error('ADJUSTMENT.INVALID_PAYLOAD');
    }
    if (!reason || !reason.trim()) {
      throw new Error('ADJUSTMENT.REASON_REQUIRED');
    }

    return this.repo.createStockAdjustment({
      warehouseId: Number(warehouseId),
      productId: Number(productId),
      difference: Number(difference), 
      reason: reason.trim(),
    });
  }
}
