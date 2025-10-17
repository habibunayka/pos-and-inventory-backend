// src/Domains/Warehouse/repositories/WarehouseRepository.js

export default class WarehouseRepository {
  async findAll() {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async findById(id) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async createWarehouse(warehouseData) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updateWarehouse({ id, warehouseData }) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteWarehouse(id) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async findStocksByWarehouse(warehouseId) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async assertSufficientStock(warehouseId, itemId, quantity) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async transferStock({ sourceWarehouseId, targetWarehouseId, productId, quantity, note }) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async receivePurchase({ warehouseId, items }) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async createStockAdjustment({ warehouseId, productId, difference, reason }) {
    throw new Error("WAREHOUSE_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}
