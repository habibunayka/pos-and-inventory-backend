import DeliveryIntegration from "../../Domains/DeliveryIntegrations/Entities/DeliveryIntegration.js";
import DeliveryIntegrationRepository from "../../Domains/DeliveryIntegrations/Repositories/DeliveryIntegrationRepository.js";

export default class PrismaDeliveryIntegrationRepository extends DeliveryIntegrationRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_DELIVERYINTEGRATION_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.deliveryIntegration.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => DeliveryIntegration.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.deliveryIntegration.findFirst({ where: { id, deletedAt: null } });
		return DeliveryIntegration.fromPersistence(record);
	}

	async createDeliveryIntegration(data) {
		const record = await this._prisma.deliveryIntegration.create({ data });
		return DeliveryIntegration.fromPersistence(record);
	}

	async updateDeliveryIntegration({ id, data }) {
		const existing = await this._prisma.deliveryIntegration.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.deliveryIntegration.update({ where: { id }, data });
		return DeliveryIntegration.fromPersistence(record);
	}

	async deleteDeliveryIntegration(id) {
		const existing = await this._prisma.deliveryIntegration.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.deliveryIntegration.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
