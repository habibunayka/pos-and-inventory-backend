import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { promotions: promoSchemas, common: commonSchemas } = validationSchemas;

export default function registerPromotionRoutes(app, { controller }) {
  if (!controller) throw new Error('PROMOTION_ROUTES.MISSING_CONTROLLER');
  const router = express.Router();
  router.get('/', adapt(controller.list.bind(controller)));
  router.post('/', validateRequest({ body: promoSchemas.create }), adapt(controller.create.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.get.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: promoSchemas.update }), adapt(controller.update.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.delete.bind(controller)));
  app.use('/api/promotions', router);
}

