import PrismaWarehouseRepository from "../Repositories/PrismaWarehouseRepository.js";
import WarehouseService from "../../Applications/Warehouse/Services/WarehouseService.js";
import { ListWarehousesUsecase, GetWarehouseUsecase, GetWarehouseStocksUsecase, TransferStockUsecase, ReceivePurchaseUsecase, CreateStockAdjustmentUsecase } from "../../Applications/Warehouse/UseCases/index.js";
import WarehousePresenter from "../../Interfaces/Presenters/WarehousePresenter.js";
import WarehouseController from "../../Interfaces/Controllers/WarehouseController.js";

export default function registerWarehouseContainer({ container, overrides = {}, prisma }) {
  const warehouseRepository = overrides.warehouseRepository ?? new PrismaWarehouseRepository({ prisma });
  const warehouseService = overrides.warehouseService ?? new WarehouseService({ warehouseRepository });
  const warehousePresenter = overrides.warehousePresenter ?? new WarehousePresenter();

  const listWarehousesUsecase = overrides.listWarehousesUsecase ?? new ListWarehousesUsecase({ warehouseRepository });
  const getWarehouseUsecase = overrides.getWarehouseUsecase ?? new GetWarehouseUsecase({ warehouseRepository });
  const getWarehouseStocksUsecase = overrides.getWarehouseStocksUsecase ?? new GetWarehouseStocksUsecase({ warehouseRepository });
  const transferStockUsecase = overrides.transferStockUsecase ?? new TransferStockUsecase({ warehouseRepository });
  const receivePurchaseUsecase = overrides.receivePurchaseUsecase ?? new ReceivePurchaseUsecase({ warehouseRepository });
  const createStockAdjustmentUsecase = overrides.createStockAdjustmentUsecase ?? new CreateStockAdjustmentUsecase({ warehouseRepository });

  const warehouseController = new WarehouseController({
    warehousePresenter,
    listWarehousesUsecase,
    getWarehouseUsecase,
    getWarehouseStocksUsecase,
    transferStockUsecase,
    receivePurchaseUsecase,
    createStockAdjustmentUsecase,
  });

  container.set("warehouseRepository", warehouseRepository);
  container.set("warehouseService", warehouseService);
  container.set("warehousePresenter", warehousePresenter);
  container.set("warehouseController", warehouseController);
}
oke udah semua ya?
