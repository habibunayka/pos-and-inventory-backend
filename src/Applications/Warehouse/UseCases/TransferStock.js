
export default class TransferStockUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository)
      throw new Error('TransferStockUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute(payload) {
    const { sourceWarehouseId, targetWarehouseId, productId, quantity, note } =
      payload ?? {};

    if (!sourceWarehouseId || !targetWarehouseId || !productId || !quantity)
      throw new Error('TRANSFER_STOCK.INVALID_PAYLOAD');
    if (Number(sourceWarehouseId) === Number(targetWarehouseId))
      throw new Error('TRANSFER_STOCK.SAME_WAREHOUSE');
    if (quantity <= 0) throw new Error('TRANSFER_STOCK.INVALID_QUANTITY');

    // pastikan stok cukup di gudang asal
    await this.repo.assertSufficientStock(
      Number(sourceWarehouseId),
      Number(productId),
      Number(quantity)
    );

    return this.repo.transferStock({
      sourceWarehouseId: Number(sourceWarehouseId),
      targetWarehouseId: Number(targetWarehouseId),
      productId: Number(productId),
      quantity: Number(quantity),
      note: note ?? null,
    });
  }
}
