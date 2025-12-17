import UserRepository from "../../Domains/Users/Repositories/UserRepository.js";

const userInclude = {
	userRoles: {
		where: {
			deletedAt: null,
			role: { deletedAt: null }
		},
		orderBy: { id: "asc" },
		include: {
			role: {
				include: {
					rolePermissions: {
						where: {
							deletedAt: null,
							permission: { deletedAt: null }
						},
						include: { permission: true }
					}
				}
			}
		}
	}
};

export default class PrismaUserRepository extends UserRepository {
	constructor({ prisma } = {}) {
		super();

		if (!prisma) {
			throw new Error("PRISMA_USER_REPOSITORY.MISSING_CLIENT");
		}

		this._prisma = prisma;
	}

	async findAll() {
		return this._prisma.user.findMany({
			where: { deletedAt: null },
			include: userInclude,
			orderBy: { id: "asc" }
		});
	}

	async findById(id) {
		return this._prisma.user.findFirst({ where: { id, deletedAt: null }, include: userInclude });
	}

	async findRoleByName(roleName) {
		return this._prisma.role.findFirst({
			where: { name: roleName.toLowerCase(), deletedAt: null },
			include: {
				rolePermissions: {
					where: {
						deletedAt: null,
						permission: { deletedAt: null }
					},
					include: { permission: true }
				}
			}
		});
	}

	async findByEmail(email) {
		if (!email) {
			return null;
		}

		return this._prisma.user.findFirst({ where: { email, deletedAt: null }, include: userInclude });
	}

	async findByName(name) {
		if (!name) {
			return null;
		}

		return this._prisma.user.findFirst({
			where: {
				deletedAt: null,
				name: {
					equals: name,
					mode: "insensitive"
				}
			},
			include: userInclude
		});
	}

	async createUser({ userData, roleId, placeId }) {
		return this._prisma.$transaction(async (tx) => {
			const createdUser = await tx.user.create({ data: userData });

			await tx.userRole.create({
				data: {
					userId: createdUser.id,
					roleId,
					placeId: placeId ?? null
				}
			});

			return tx.user.findFirst({ where: { id: createdUser.id, deletedAt: null }, include: userInclude });
		});
	}

	async updateUser({ id, userData, roleId, placeId }) {
		return this._prisma.$transaction(async (tx) => {
			const existing = await tx.user.findFirst({ where: { id, deletedAt: null } });
			if (!existing) {
				return null;
			}

			const savedUser = await tx.user.update({
				where: { id },
				data: userData
			});

			const assignment = await tx.userRole.findFirst({
				where: { userId: savedUser.id, deletedAt: null }
			});

			if (assignment) {
				await tx.userRole.update({
					where: { id: assignment.id },
					data: {
						roleId,
						placeId: placeId ?? assignment.placeId ?? null
					}
				});
			} else {
				await tx.userRole.create({
					data: {
						userId: savedUser.id,
						roleId,
						placeId: placeId ?? null
					}
				});
			}

			return tx.user.findFirst({ where: { id: savedUser.id, deletedAt: null }, include: userInclude });
		});
	}
}
