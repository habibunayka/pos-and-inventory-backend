import RoleRepository from "../../Domains/Roles/Repositories/RoleRepository.js";

const roleInclude = {
	rolePermissions: {
		where: {
			deletedAt: null,
			permission: { deletedAt: null }
		},
		include: {
			permission: true
		}
	},
	userRoles: {
		where: {
			deletedAt: null,
			user: { deletedAt: null }
		},
		select: { id: true }
	}
};

export default class PrismaRoleRepository extends RoleRepository {
	constructor({ prisma } = {}) {
		super();

		if (!prisma) {
			throw new Error("PRISMA_ROLE_REPOSITORY.MISSING_CLIENT");
		}

		this._prisma = prisma;
	}

	async findAll() {
		return this._prisma.role.findMany({
			where: { deletedAt: null },
			include: roleInclude,
			orderBy: { id: "asc" }
		});
	}

	async findById(id) {
		return this._prisma.role.findFirst({ where: { id, deletedAt: null }, include: roleInclude });
	}

	async findByName(name) {
		if (!name) {
			return null;
		}

		return this._prisma.role.findFirst({ where: { name, deletedAt: null }, include: roleInclude });
	}

	async findPermissionsByNames(permissionNames) {
		if (!permissionNames || permissionNames.length === 0) {
			return [];
		}

		return this._prisma.permission.findMany({
			where: {
				name: { in: permissionNames },
				deletedAt: null
			}
		});
	}

	async createRole({ roleData, permissionIds }) {
		return this._prisma.$transaction(async (tx) => {
			const created = await tx.role.create({ data: roleData });

			if (permissionIds && permissionIds.length > 0) {
				await tx.rolePermission.createMany({
					data: permissionIds.map((permissionId) => ({
						roleId: created.id,
						permissionId
					})),
					skipDuplicates: true
				});
			}

			return tx.role.findFirst({ where: { id: created.id, deletedAt: null }, include: roleInclude });
		});
	}

	async updateRole({ id, roleData, permissionIds }) {
		return this._prisma.$transaction(async (tx) => {
			const existing = await tx.role.findFirst({ where: { id, deletedAt: null } });
			if (!existing) {
				return null;
			}

			const updated = await tx.role.update({
				where: { id },
				data: roleData
			});

			await tx.rolePermission.updateMany({
				where: { roleId: id, deletedAt: null },
				data: { deletedAt: new Date() }
			});

			if (permissionIds && permissionIds.length > 0) {
				for (const permissionId of permissionIds) {
					await tx.rolePermission.upsert({
						where: {
							roleId_permissionId: {
								roleId: id,
								permissionId
							}
						},
						update: { deletedAt: null },
						create: {
							roleId: id,
							permissionId
						}
					});
				}
			}

			return tx.role.findFirst({ where: { id: updated.id, deletedAt: null }, include: roleInclude });
		});
	}

	async deleteRole(id) {
		const existing = await this._prisma.role.findFirst({ where: { id, deletedAt: null } });
		if (!existing) {
			return false;
		}
		await this._prisma.role.update({ where: { id }, data: { deletedAt: new Date() } });
		await this._prisma.rolePermission.updateMany({
			where: { roleId: id, deletedAt: null },
			data: { deletedAt: new Date() }
		});
		return true;
	}
}
