import express from "../../../Infrastructures/WebServer/ExpressShim.js";
import adapt from "../ExpressAdapter.js";
import { validateRequest, schemas as validationSchemas } from "../Validators/Index.js";
import { requirePermission } from "./permissionGuards.js";

const { stations: stationSchemas, common: commonSchemas } = validationSchemas;

export default function registerStationRoutes(app, { controller, requireAuth, authorize } = {}) {
	if (!controller) throw new Error("STATION_ROUTES.MISSING_CONTROLLER");

	const router = express.Router();
	const canViewStations = requirePermission("view_payments", { requireAuth, authorize });
	const canCreateStations = requirePermission("add_payments", { requireAuth, authorize });
	const canUpdateStations = requirePermission("edit_payments", { requireAuth, authorize });
	const canDeleteStations = requirePermission("delete_payments", { requireAuth, authorize });

	router.get("/", ...canViewStations, adapt(controller.list.bind(controller)));
	router.post(
		"/",
		...canCreateStations,
		validateRequest({ body: stationSchemas.create }),
		adapt(controller.create.bind(controller))
	);
	router.get(
		"/:id",
		...canViewStations,
		validateRequest({ params: commonSchemas.idParam }),
		adapt(controller.get.bind(controller))
	);
	router.put(
		"/:id",
		...canUpdateStations,
		validateRequest({ params: commonSchemas.idParam, body: stationSchemas.update }),
		adapt(controller.update.bind(controller))
	);
	router.delete(
		"/:id",
		...canDeleteStations,
		validateRequest({ params: commonSchemas.idParam }),
		adapt(controller.delete.bind(controller))
	);

	app.use("/api/stations", router);
}
