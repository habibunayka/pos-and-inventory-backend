import BaseReportFileUsecase from "./BaseReportFileUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class CreateReportFileUsecase extends BaseReportFileUsecase {
	async execute(payload = {}) {
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const label = String(payload.label ?? "").trim();
		if (!label) throw new ValidationError("label is required");

		const filePath = String(payload.filePath ?? "").trim();
		if (!filePath) throw new ValidationError("filePath is required");

		const data = { label, filePath };
		if (payload.mimeType !== undefined) data.mimeType = payload.mimeType;
		if (payload.fileSize !== undefined) data.fileSize = Number(payload.fileSize);
		if (payload.metaJson !== undefined) data.metaJson = payload.metaJson;

		return this.reportFileService.createReportFile(data);
	}
}
