import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';

export default function registerWarehouseRoutes(app, { controller }) {
  if (!controller) {
    throw new Error('WAREHOUSE_ROUTES.MISSING_CONTROLLER');
  }

  const router = express.Router();

  router.get('/', adapt(controller.listWarehouses.bind(controller)));
  router.get('/:id', adapt(controller.getWarehouse.bind(controller)));
  router.get('/:id/stocks', adapt(controller.getWarehouseStocks.bind(controller)));
  router.post('/transfer', adapt(controller.transferStock.bind(controller)));
  router.post('/receive', adapt(controller.receivePurchase.bind(controller)));
  router.post('/adjust', adapt(controller.adjustStock.bind(controller)));

  app.use('/api/warehouses', router);
}