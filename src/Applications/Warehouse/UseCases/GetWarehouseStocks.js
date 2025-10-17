export default class GetWarehouseStocksUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository) throw new Error('GetWarehouseStocksUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute(warehouseId) {
    if (!warehouseId) throw new Error('WAREHOUSE_ID_REQUIRED');
    return this.repo.findStocksByWarehouse(Number(warehouseId));
  }
}
