import express from "../../../Infrastructures/WebServer/ExpressShim.js";
import adapt from "../ExpressAdapter.js";
import { validateRequest, schemas as validationSchemas } from "../Validators/Index.js";
import { requirePermission } from "./permissionGuards.js";

const { shifts: shiftSchemas, common: commonSchemas } = validationSchemas;

export default function registerShiftRoutes(app, { controller, requireAuth, authorize } = {}) {
	if (!controller) throw new Error("SHIFT_ROUTES.MISSING_CONTROLLER");

	const router = express.Router();
	const canViewShifts = requirePermission("view_payments", { requireAuth, authorize });
	const canCreateShifts = requirePermission("add_payments", { requireAuth, authorize });
	const canUpdateShifts = requirePermission("edit_payments", { requireAuth, authorize });
	const canDeleteShifts = requirePermission("delete_payments", { requireAuth, authorize });

	router.get("/", ...canViewShifts, adapt(controller.list.bind(controller)));
	router.post(
		"/",
		...canCreateShifts,
		validateRequest({ body: shiftSchemas.create }),
		adapt(controller.create.bind(controller))
	);
	router.get(
		"/:id",
		...canViewShifts,
		validateRequest({ params: commonSchemas.idParam }),
		adapt(controller.get.bind(controller))
	);
	router.put(
		"/:id",
		...canUpdateShifts,
		validateRequest({ params: commonSchemas.idParam, body: shiftSchemas.update }),
		adapt(controller.update.bind(controller))
	);
	router.delete(
		"/:id",
		...canDeleteShifts,
		validateRequest({ params: commonSchemas.idParam }),
		adapt(controller.delete.bind(controller))
	);

	app.use("/api/shifts", router);
}
