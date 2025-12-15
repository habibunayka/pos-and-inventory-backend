import BaseReportFileUsecase from "./BaseReportFileUsecase.js";
import ValidationError from "../../../Commons/Errors/ValidationError.js";

export default class UpdateReportFileUsecase extends BaseReportFileUsecase {
	async execute(id, payload = {}) {
		const intId = this._toInt(id);
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new ValidationError("Payload must be an object");
		}

		const data = {};
		if (typeof payload.label !== "undefined") data.label = String(payload.label ?? "").trim();
		if (typeof payload.filePath !== "undefined") data.filePath = String(payload.filePath ?? "").trim();
		if (typeof payload.mimeType !== "undefined") data.mimeType = payload.mimeType;
		if (typeof payload.fileSize !== "undefined") {
			const size = Number(payload.fileSize);
			if (!Number.isFinite(size)) throw new ValidationError("fileSize must be a number");
			data.fileSize = size;
		}
		if (typeof payload.metaJson !== "undefined") data.metaJson = payload.metaJson;

		if (Object.keys(data).length === 0) throw new ValidationError("No valid fields to update");
		const rec = await this.reportFileService.updateReportFile({ id: intId, data });
		if (!rec) throw new ValidationError("Report file not found");
		return rec;
	}
}
