import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields";

//named export, instead of export default
export const User = list({
	// access:
	// ui:
	fields: {
		name: text({ isRequired: true }),
		email: text({ isRequired: true, isUnique: true }),
		password: password(),
		cart: relationship({
			ref: "CartItem.user",
			many: true,
			ui: {
				createView: { fieldMode: "hidden" },
				itemView: { fieldMode: "read" },
			},
		}),
	},
});
