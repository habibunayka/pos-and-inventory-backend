
export default class GetWarehouseUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository)
      throw new Error('GetWarehouseUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute(warehouseId) {
    if (!warehouseId) throw new Error('WAREHOUSE_ID_REQUIRED');
    return this.repo.findById(Number(warehouseId));
  }
}
