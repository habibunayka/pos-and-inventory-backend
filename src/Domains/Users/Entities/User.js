import Role from "../../Roles/Entities/Role.js";

export default class User {
	constructor({
		id = null,
		name,
		email = null,
		status = "active",
		authenticationMethod = "password",
		role = null,
		placeId = null,
		createdAt = null,
		updatedAt = null
	}) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.status = status;
		this.authenticationMethod = authenticationMethod;
		this.role = role;
		this.placeId = placeId;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	static fromPersistence(record) {
		const assignments = Array.isArray(record.userRoles) ? [...record.userRoles].filter(Boolean) : [];
		assignments.sort((a, b) => {
			const aId = a?.id ?? Number.MAX_SAFE_INTEGER;
			const bId = b?.id ?? Number.MAX_SAFE_INTEGER;
			return aId - bId;
		});
		const roleAssignment = assignments.find((assignment) => assignment?.role) ?? assignments[0];
		const role = Role.fromPersistence(roleAssignment?.role);

		return new User({
			id: record.id,
			name: record.name,
			email: record.email,
			status: record.status,
			authenticationMethod: record.pinCodeHash ? "pin" : "password",
			role,
			placeId: roleAssignment?.placeId ?? null,
			createdAt: record.createdAt ?? null,
			updatedAt: record.updatedAt ?? null
		});
	}

	static normalizeEmail(email) {
		if (!email) return null;
		return String(email).trim().toLowerCase() || null;
	}
}
