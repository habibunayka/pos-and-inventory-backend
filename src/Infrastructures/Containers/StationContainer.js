import PrismaStationRepository from "../Repositories/PrismaStationRepository.js";
import StationService from "../../Applications/Stations/Services/StationService.js";
import ListStationsUsecase from "../../Applications/Stations/UseCases/ListStationsUsecase.js";
import GetStationUsecase from "../../Applications/Stations/UseCases/GetStationUsecase.js";
import CreateStationUsecase from "../../Applications/Stations/UseCases/CreateStationUsecase.js";
import UpdateStationUsecase from "../../Applications/Stations/UseCases/UpdateStationUsecase.js";
import DeleteStationUsecase from "../../Applications/Stations/UseCases/DeleteStationUsecase.js";
import StationPresenter from "../../Interfaces/Presenters/StationPresenter.js";
import StationController from "../../Interfaces/Controllers/StationController.js";
import PlaceService from "../../Applications/Places/Services/PlaceService.js";
import PrismaPlaceRepository from "../Repositories/PrismaPlaceRepository.js";

export default function registerStationContainer({ container, overrides = {}, prisma }) {
	const stationRepository = overrides.stationRepository ?? new PrismaStationRepository({ prisma });
	const stationService = overrides.stationService ?? new StationService({ stationRepository });

	let placeService =
		overrides.placeService ?? (container?.has("placeService") ? container.get("placeService") : null);
	if (!placeService && prisma) {
		const placeRepository = new PrismaPlaceRepository({ prisma });
		placeService = new PlaceService({ placeRepository });
	}

	const listStationsUsecase = overrides.listStationsUsecase ?? new ListStationsUsecase({ stationService, placeService });
	const getStationUsecase = overrides.getStationUsecase ?? new GetStationUsecase({ stationService, placeService });
	const createStationUsecase =
		overrides.createStationUsecase ?? new CreateStationUsecase({ stationService, placeService });
	const updateStationUsecase =
		overrides.updateStationUsecase ?? new UpdateStationUsecase({ stationService, placeService });
	const deleteStationUsecase =
		overrides.deleteStationUsecase ?? new DeleteStationUsecase({ stationService, placeService });

	const stationPresenter = overrides.stationPresenter ?? new StationPresenter();
	const stationController =
		overrides.stationController ??
		new StationController({
			presenter: stationPresenter,
			listUsecase: listStationsUsecase,
			getUsecase: getStationUsecase,
			createUsecase: createStationUsecase,
			updateUsecase: updateStationUsecase,
			deleteUsecase: deleteStationUsecase
		});

	container.set("stationRepository", stationRepository);
	container.set("stationService", stationService);
	container.set("listStationsUsecase", listStationsUsecase);
	container.set("getStationUsecase", getStationUsecase);
	container.set("createStationUsecase", createStationUsecase);
	container.set("updateStationUsecase", updateStationUsecase);
	container.set("deleteStationUsecase", deleteStationUsecase);
	container.set("stationPresenter", stationPresenter);
	container.set("stationController", stationController);
}
