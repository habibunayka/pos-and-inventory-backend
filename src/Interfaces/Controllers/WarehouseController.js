import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class WarehouseController {
  constructor({
    warehousePresenter,
    listWarehousesUsecase,
    getWarehouseStocksUsecase,
    transferStockUsecase,
    createStockAdjustmentUsecase,
    receivePurchaseUsecase,
  }) {
    if (!warehousePresenter) {
      throw new Error('WarehouseController requires a presenter');
    }

    const requiredUsecases = [
      ['listWarehousesUsecase', listWarehousesUsecase],
      ['getWarehouseStocksUsecase', getWarehouseStocksUsecase],
      ['transferStockUsecase', transferStockUsecase],
      ['createStockAdjustmentUsecase', createStockAdjustmentUsecase],
      ['receivePurchaseUsecase', receivePurchaseUsecase],
    ];

    const missing = requiredUsecases.find(([, usecase]) => !usecase);
    if (missing) {
      throw new Error(`WarehouseController requires ${missing[0]}`);
    }

    this.warehousePresenter = warehousePresenter;
    this.listWarehousesUsecase = listWarehousesUsecase;
    this.getWarehouseStocksUsecase = getWarehouseStocksUsecase;
    this.transferStockUsecase = transferStockUsecase;
    this.createStockAdjustmentUsecase = createStockAdjustmentUsecase;
    this.receivePurchaseUsecase = receivePurchaseUsecase;
  }

  async listWarehouses() {
    const warehouses = await this.listWarehousesUsecase.execute();
    return {
      status: HttpStatus.OK,
      data: this.warehousePresenter.presentCollection(warehouses),
    };
  }

  async getWarehouseStocks({ params }) {
    const stocks = await this.getWarehouseStocksUsecase.execute(params.id);
    return {
      status: HttpStatus.OK,
      data: this.warehousePresenter.presentCollection(stocks),
    };
  }

  async transferStock({ body }) {
    const result = await this.transferStockUsecase.execute(body);
    return {
      status: HttpStatus.OK,
      message: 'Transfer stok berhasil',
      data: this.warehousePresenter.present(result),
    };
  }

  async createStockAdjustment({ body }) {
    const result = await this.createStockAdjustmentUsecase.execute(body);
    return {
      status: HttpStatus.CREATED,
      message: 'Penyesuaian stok berhasil',
      data: this.warehousePresenter.present(result),
    };
  }

  async receivePurchase({ body }) {
    const result = await this.receivePurchaseUsecase.execute(body);
    return {
      status: HttpStatus.CREATED,
      message: 'Penerimaan pembelian berhasil',
      data: this.warehousePresenter.present(result),
    };
  }
}
