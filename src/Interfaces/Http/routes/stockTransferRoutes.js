import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { stockTransfers: stSchemas, common: commonSchemas } = validationSchemas;

export default function registerStockTransferRoutes(app, { controller }) {
  if (!controller) throw new Error('STOCK_TRANSFER_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.list.bind(controller)));
  router.post('/', validateRequest({ body: stSchemas.create }), adapt(controller.create.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.get.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.delete.bind(controller)));

  app.use('/api/stock-transfers', router);
}

