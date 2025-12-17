import IngredientPackage from "../../Domains/Ingredients/Entities/IngredientPackage.js";
import IngredientPackageRepository from "../../Domains/Ingredients/Repositories/IngredientPackageRepository.js";

export default class PrismaIngredientPackageRepository extends IngredientPackageRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_INGREDIENT_PACKAGE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.ingredientPackage.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => IngredientPackage.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.ingredientPackage.findFirst({ where: { id, deletedAt: null } });
		return IngredientPackage.fromPersistence(record);
	}

	async createIngredientPackage(data) {
		const record = await this._prisma.ingredientPackage.create({ data });
		return IngredientPackage.fromPersistence(record);
	}

	async updateIngredientPackage({ id, data }) {
		const existing = await this._prisma.ingredientPackage.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.ingredientPackage.update({ where: { id }, data });
		return IngredientPackage.fromPersistence(record);
	}

	async deleteIngredientPackage(id) {
		const existing = await this._prisma.ingredientPackage.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.ingredientPackage.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
