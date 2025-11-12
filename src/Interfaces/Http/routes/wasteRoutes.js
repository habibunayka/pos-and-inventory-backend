import express from '../../../Infrastructures/WebServer/ExpressShim.js';
import adapt from '../ExpressAdapter.js';
import { validateRequest, schemas as validationSchemas } from '../Validators/Index.js';

const { wastes: wSchemas, common: commonSchemas } = validationSchemas;

export default function registerWasteRoutes(app, { controller }) {
  if (!controller) throw new Error('WASTE_ROUTES.MISSING_CONTROLLER');

  const router = express.Router();
  router.get('/', adapt(controller.list.bind(controller)));
  router.post('/', validateRequest({ body: wSchemas.create }), adapt(controller.create.bind(controller)));
  router.get('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.get.bind(controller)));
  router.put('/:id', validateRequest({ params: commonSchemas.idParam, body: wSchemas.update }), adapt(controller.update.bind(controller)));
  router.delete('/:id', validateRequest({ params: commonSchemas.idParam }), adapt(controller.delete.bind(controller)));

  app.use('/api/wastes', router);
}

