import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { cashierShifts: csSchemas, common: commonSchemas } = validationSchemas;

export default function registerCashierShiftRoutes(app, { controller }) {
  if (!controller) throw new Error('CASHIER_SHIFT_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.list.bind(controller)));
  router.post('/', validateRequest({ body: csSchemas.create }), adapt(controller.create.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.get.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: csSchemas.update }), adapt(controller.update.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.delete.bind(controller)));

  app.use('/api/cashier-shifts', router);
}

