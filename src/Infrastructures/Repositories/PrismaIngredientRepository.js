import Ingredient from "../../Domains/Ingredients/Entities/Ingredient.js";
import IngredientRepository from "../../Domains/Ingredients/Repositories/IngredientRepository.js";

export default class PrismaIngredientRepository extends IngredientRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_INGREDIENT_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.ingredient.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Ingredient.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.ingredient.findFirst({ where: { id, deletedAt: null } });
		return Ingredient.fromPersistence(record);
	}

	async createIngredient(ingredientData) {
		const record = await this._prisma.ingredient.create({ data: ingredientData });
		return Ingredient.fromPersistence(record);
	}

	async updateIngredient({ id, ingredientData }) {
		const existing = await this._prisma.ingredient.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.ingredient.update({ where: { id }, data: ingredientData });
		return Ingredient.fromPersistence(record);
	}

	async deleteIngredient(id) {
		const existing = await this._prisma.ingredient.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.ingredient.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
