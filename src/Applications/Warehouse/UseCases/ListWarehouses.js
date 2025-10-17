export default class ListWarehousesUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository) throw new Error('ListWarehousesUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute() {
    return this.repo.findAllWarehouses();
  }
}
