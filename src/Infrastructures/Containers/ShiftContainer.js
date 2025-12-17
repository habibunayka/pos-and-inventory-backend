import PrismaShiftRepository from "../Repositories/PrismaShiftRepository.js";
import ShiftService from "../../Applications/Shifts/Services/ShiftService.js";
import ListShiftsUsecase from "../../Applications/Shifts/UseCases/ListShiftsUsecase.js";
import GetShiftUsecase from "../../Applications/Shifts/UseCases/GetShiftUsecase.js";
import CreateShiftUsecase from "../../Applications/Shifts/UseCases/CreateShiftUsecase.js";
import UpdateShiftUsecase from "../../Applications/Shifts/UseCases/UpdateShiftUsecase.js";
import DeleteShiftUsecase from "../../Applications/Shifts/UseCases/DeleteShiftUsecase.js";
import ShiftPresenter from "../../Interfaces/Presenters/ShiftPresenter.js";
import ShiftController from "../../Interfaces/Controllers/ShiftController.js";
import PlaceService from "../../Applications/Places/Services/PlaceService.js";
import PrismaPlaceRepository from "../Repositories/PrismaPlaceRepository.js";

export default function registerShiftContainer({ container, overrides = {}, prisma }) {
	const shiftRepository = overrides.shiftRepository ?? new PrismaShiftRepository({ prisma });
	const shiftService = overrides.shiftService ?? new ShiftService({ shiftRepository });

	let placeService =
		overrides.placeService ?? (container?.has("placeService") ? container.get("placeService") : null);
	if (!placeService && prisma) {
		const placeRepository = new PrismaPlaceRepository({ prisma });
		placeService = new PlaceService({ placeRepository });
	}

	const listShiftsUsecase = overrides.listShiftsUsecase ?? new ListShiftsUsecase({ shiftService, placeService });
	const getShiftUsecase = overrides.getShiftUsecase ?? new GetShiftUsecase({ shiftService, placeService });
	const createShiftUsecase = overrides.createShiftUsecase ?? new CreateShiftUsecase({ shiftService, placeService });
	const updateShiftUsecase = overrides.updateShiftUsecase ?? new UpdateShiftUsecase({ shiftService, placeService });
	const deleteShiftUsecase = overrides.deleteShiftUsecase ?? new DeleteShiftUsecase({ shiftService, placeService });

	const shiftPresenter = overrides.shiftPresenter ?? new ShiftPresenter();
	const shiftController =
		overrides.shiftController ??
		new ShiftController({
			presenter: shiftPresenter,
			listUsecase: listShiftsUsecase,
			getUsecase: getShiftUsecase,
			createUsecase: createShiftUsecase,
			updateUsecase: updateShiftUsecase,
			deleteUsecase: deleteShiftUsecase
		});

	container.set("shiftRepository", shiftRepository);
	container.set("shiftService", shiftService);
	container.set("listShiftsUsecase", listShiftsUsecase);
	container.set("getShiftUsecase", getShiftUsecase);
	container.set("createShiftUsecase", createShiftUsecase);
	container.set("updateShiftUsecase", updateShiftUsecase);
	container.set("deleteShiftUsecase", deleteShiftUsecase);
	container.set("shiftPresenter", shiftPresenter);
	container.set("shiftController", shiftController);
}
