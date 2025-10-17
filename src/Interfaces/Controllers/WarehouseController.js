import HttpStatus from "../../Commons/Constants/HttpStatus.js";

export default class WarehouseController {
  constructor({ warehousePresenter, listWarehousesUsecase, getWarehouseUsecase, getWarehouseStocksUsecase, transferStockUsecase, receivePurchaseUsecase, createStockAdjustmentUsecase } = {}) {
    if (!warehousePresenter) {
      throw new Error("WarehouseController requires warehousePresenter");
    }

    const required = [
      ["listWarehousesUsecase", listWarehousesUsecase],
      ["getWarehouseUsecase", getWarehouseUsecase],
      ["getWarehouseStocksUsecase", getWarehouseStocksUsecase],
      ["transferStockUsecase", transferStockUsecase],
      ["receivePurchaseUsecase", receivePurchaseUsecase],
      ["createStockAdjustmentUsecase", createStockAdjustmentUsecase],
    ];

    const missing = required.find(([name, usecase]) => !usecase);
    if (missing) {
      throw new Error(`WarehouseController requires ${missing[0]}`);
    }

    this.warehousePresenter = warehousePresenter;
    this.listWarehousesUsecase = listWarehousesUsecase;
    this.getWarehouseUsecase = getWarehouseUsecase;
    this.getWarehouseStocksUsecase = getWarehouseStocksUsecase;
    this.transferStockUsecase = transferStockUsecase;
    this.receivePurchaseUsecase = receivePurchaseUsecase;
    this.createStockAdjustmentUsecase = createStockAdjustmentUsecase;
  }

  async listWarehouses() {
    const warehouses = await this.listWarehousesUsecase.execute();
    return {
      status: HttpStatus.OK,
      data: this.warehousePresenter.presentCollection(warehouses),
    };
  }

  async getWarehouse({ params }) {
    const warehouse = await this.getWarehouseUsecase.execute(params.id);
    return {
      status: HttpStatus.OK,
      data: this.warehousePresenter.present(warehouse),
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
      data: result,
    };
  }

  async receivePurchase({ body }) {
    const result = await this.receivePurchaseUsecase.execute(body);
    return {
      status: HttpStatus.OK,
      data: result,
    };
  }

  async adjustStock({ body }) {
    const result = await this.createStockAdjustmentUsecase.execute(body);
    return {
      status: HttpStatus.OK,
      data: result,
    };
  }
}
