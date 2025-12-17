import Recipe from "../../Domains/Recipes/Entities/Recipe.js";
import RecipeRepository from "../../Domains/Recipes/Repositories/RecipeRepository.js";

export default class PrismaRecipeRepository extends RecipeRepository {
	constructor({ prisma } = {}) {
		super();
		if (!prisma) throw new Error("PRISMA_RECIPE_REPOSITORY.MISSING_CLIENT");
		this._prisma = prisma;
	}

	async findAll() {
		const records = await this._prisma.recipe.findMany({
			where: { deletedAt: null },
			orderBy: { id: "asc" }
		});
		return records.map((record) => Recipe.fromPersistence(record));
	}

	async findById(id) {
		const record = await this._prisma.recipe.findFirst({ where: { id, deletedAt: null } });
		return Recipe.fromPersistence(record);
	}

	async createRecipe(data) {
		const record = await this._prisma.recipe.create({ data });
		return Recipe.fromPersistence(record);
	}

	async updateRecipe({ id, data }) {
		const existing = await this._prisma.recipe.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return null;
		const record = await this._prisma.recipe.update({ where: { id }, data });
		return Recipe.fromPersistence(record);
	}

	async deleteRecipe(id) {
		const existing = await this._prisma.recipe.findFirst({ where: { id, deletedAt: null } });
		if (!existing) return false;
		await this._prisma.recipe.update({ where: { id }, data: { deletedAt: new Date() } });
		return true;
	}
}
