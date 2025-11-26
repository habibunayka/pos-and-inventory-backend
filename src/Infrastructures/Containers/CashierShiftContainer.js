import PrismaCashierShiftRepository from "../Repositories/PrismaCashierShiftRepository.js";
import CashierShiftService from "../../Applications/Stocks/Services/CashierShiftService.js";
import ListCashierShiftsUsecase from "../../Applications/Stocks/UseCases/cashierShifts/ListCashierShiftsUsecase.js";
import GetCashierShiftUsecase from "../../Applications/Stocks/UseCases/cashierShifts/GetCashierShiftUsecase.js";
import CreateCashierShiftUsecase from "../../Applications/Stocks/UseCases/cashierShifts/CreateCashierShiftUsecase.js";
import UpdateCashierShiftUsecase from "../../Applications/Stocks/UseCases/cashierShifts/UpdateCashierShiftUsecase.js";
import DeleteCashierShiftUsecase from "../../Applications/Stocks/UseCases/cashierShifts/DeleteCashierShiftUsecase.js";
import OpenCashierShiftUsecase from "../../Applications/Stocks/UseCases/cashierShifts/OpenCashierShiftUsecase.js";
import CloseCashierShiftUsecase from "../../Applications/Stocks/UseCases/cashierShifts/CloseCashierShiftUsecase.js";
import CashierShiftPresenter from "../../Interfaces/Presenters/CashierShiftPresenter.js";
import CashierShiftController from "../../Interfaces/Controllers/CashierShiftController.js";
import PrismaPlaceRepository from "../Repositories/PrismaPlaceRepository.js";
import PlaceService from "../../Applications/Places/Services/PlaceService.js";
import PrismaStationRepository from "../Repositories/PrismaStationRepository.js";
import StationService from "../../Applications/Stations/Services/StationService.js";
import PrismaShiftRepository from "../Repositories/PrismaShiftRepository.js";
import ShiftService from "../../Applications/Shifts/Services/ShiftService.js";

export default function registerCashierShiftContainer({ container, overrides = {}, prisma }) {
	const repository = overrides.cashierShiftRepository ?? new PrismaCashierShiftRepository({ prisma });
	const service = overrides.cashierShiftService ?? new CashierShiftService({ cashierShiftRepository: repository });

	let placeService =
		overrides.placeService ?? (container?.has("placeService") ? container.get("placeService") : null);
	if (!placeService && prisma) {
		const placeRepository = new PrismaPlaceRepository({ prisma });
		placeService = new PlaceService({ placeRepository });
	}

	let stationService =
		overrides.stationService ?? (container?.has("stationService") ? container.get("stationService") : null);
	if (!stationService && prisma) {
		const stationRepository = new PrismaStationRepository({ prisma });
		stationService = new StationService({ stationRepository });
	}

	let shiftService = overrides.shiftService ?? (container?.has("shiftService") ? container.get("shiftService") : null);
	if (!shiftService && prisma) {
		const shiftRepository = new PrismaShiftRepository({ prisma });
		shiftService = new ShiftService({ shiftRepository });
	}

	const baseDeps = { cashierShiftService: service, placeService, stationService, shiftService };

	const listUsecase = overrides.listCashierShiftsUsecase ?? new ListCashierShiftsUsecase(baseDeps);
	const getUsecase = overrides.getCashierShiftUsecase ?? new GetCashierShiftUsecase(baseDeps);
	const createUsecase = overrides.createCashierShiftUsecase ?? new CreateCashierShiftUsecase(baseDeps);
	const updateUsecase = overrides.updateCashierShiftUsecase ?? new UpdateCashierShiftUsecase(baseDeps);
	const deleteUsecase = overrides.deleteCashierShiftUsecase ?? new DeleteCashierShiftUsecase(baseDeps);
	const openUsecase = overrides.openCashierShiftUsecase ?? new OpenCashierShiftUsecase(baseDeps);
	const closeUsecase = overrides.closeCashierShiftUsecase ?? new CloseCashierShiftUsecase(baseDeps);
	const presenter = overrides.cashierShiftPresenter ?? new CashierShiftPresenter();
	const controller =
		overrides.cashierShiftController ??
		new CashierShiftController({
			presenter,
			listUsecase,
			getUsecase,
			createUsecase,
			updateUsecase,
			deleteUsecase,
			openUsecase,
			closeUsecase
		});

	container.set("cashierShiftRepository", repository);
	container.set("cashierShiftService", service);
	container.set("listCashierShiftsUsecase", listUsecase);
	container.set("getCashierShiftUsecase", getUsecase);
	container.set("createCashierShiftUsecase", createUsecase);
	container.set("updateCashierShiftUsecase", updateUsecase);
	container.set("deleteCashierShiftUsecase", deleteUsecase);
	container.set("openCashierShiftUsecase", openUsecase);
	container.set("closeCashierShiftUsecase", closeUsecase);
	container.set("cashierShiftPresenter", presenter);
	container.set("cashierShiftController", controller);
}
