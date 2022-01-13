// at its simplest access control is either yes or no value
import { permissionsList } from "../schemas/fields";
import { ListAccessArgs } from "../types";

export function isSignedIn({ session }: ListAccessArgs) {
	return !!session;
}

const generatedPermissions = Object.fromEntries(
	permissionsList.map((permission) => [
		permission,
		function ({ session }: ListAccessArgs) {
			return !!session?.data.role?.[permission];
		},
	])
);

//Check if user meets criteria, yes or no
export const permissions = {
	...generatedPermissions,
	isAwesome({ session }: ListAccessArgs): boolean {
		return session?.data.name.includes("migz");
	},
};

//rule based functions - return boolean or set of filters limited to items that can be updated
export const rules = {
	canManageProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		//1. Do they have the permission of canManageProducts
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		//2. If not, do they own this item
		return {
			user: { id: session.itemId },
		};
	},
	canOrder({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		// 1. Do they have the permission of canManageProducts
		if (permissions.canManageCart({ session })) {
			return true;
		}
		// 2. If not, do they own this item?
		return { user: { id: session.itemId } };
	},
	canManageOrderItems({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		// 1. Do they have the permission of canManageProducts
		if (permissions.canManageCart({ session })) {
			return true;
		}
		// 2. If not, do they own this item?
		return { order: { user: { id: session.itemId } } };
	},
	canReadProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageProducts({ session })) {
			return true; // They can read everything!
		}
		// They should only see available products (based on the status field)
		return { status: "AVAILABLE" };
	},
	canManageUsers({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageUsers({ session })) {
			return true;
		}
		// Otherwise they may only update themselves!
		return { id: session.itemId };
	},
};
