

import WarehouseRepository from '../../../Domains/Warehouse/repositories/WarehouseRepository.js';

export default class WarehouseService {
  constructor({ warehouseRepository } = {}) {
    if (!warehouseRepository) {
      throw new Error('WAREHOUSE_SERVICE.MISSING_REPOSITORY');
    }

    const requiredMethods = [
  'findAll',
  'findById',
  'createWarehouse',
  'updateWarehouse',
  'deleteWarehouse',
  'findStocksByWarehouse',
  'assertSufficientStock',
  'transferStock',
  'receivePurchase',
  'createStockAdjustment',
];


      const missingMethod = requiredMethods.find(
        (method) => typeof warehouseRepository[method] !== 'function'
      );

      if (missingMethod) {
        throw new Error(`WAREHOUSE_SERVICE.INVALID_REPOSITORY: missing ${missingMethod}`);
      }
    }

    this._warehouseRepository = warehouseRepository;
  }


  async listWarehouses() {
    return this._warehouseRepository.findAll();
  }

  async getWarehouse(id) {
    return this._warehouseRepository.findById(id);
  }

 
  async createWarehouse(warehouseData) {
    return this._warehouseRepository.createWarehouse(warehouseData);
  }


  async updateWarehouse(payload) {
    return this._warehouseRepository.updateWarehouse(payload);
  }

 
  async deleteWarehouse(id) {
    return this._warehouseRepository.deleteWarehouse(id);
  }

  async findStocksByWarehouse(warehouseId) {
  return this._warehouseRepository.findStocksByWarehouse(warehouseId);
}

async assertSufficientStock(warehouseId, itemId, qty) {
  return this._warehouseRepository.assertSufficientStock(warehouseId, itemId, qty);
}

async transferStock(payload) {
  return this._warehouseRepository.transferStock(payload);
}

async receivePurchase(payload) {
  return this._warehouseRepository.receivePurchase(payload);
}

async createStockAdjustment(payload) {
  return this._warehouseRepository.createStockAdjustment(payload);
}

}

