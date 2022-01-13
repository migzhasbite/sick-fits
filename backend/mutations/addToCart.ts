import { KeystoneContext } from "@keystone-next/types";
import { CartItem } from "../schemas/CartItem";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

async function addToCart(
	root: any,
	{ productId }: { productId: string },
	context: KeystoneContext
): Promise<CartItemCreateInput> {
	console.log("Adding to cart.");
	//1. query current user to see if they are signed in
	const sesh = context.session as Session;
	if (!sesh.itemId) {
		throw new Error("You must be logged in to do this.");
	}
	//2. query the current users cart
	const allCartItems = await context.lists.CartItem.findMany({
		where: { user: { id: sesh.itemId }, product: { id: productId } },
		resolveFields: "id,quantity",
	});
	const [existingCartItem] = allCartItems;
	if (existingCartItem) {
		console.log(existingCartItem);
		// console.log(
		// 	`There are already ${existingCartItem.quantity}, increment by 1!`
		// );
		//3. See if the current item is in their cart
		//4. if it is, increment +1
		return await context.lists.CartItem.updateOne({
			id: existingCartItem.id,
			data: { quantity: existingCartItem.quantity + 1 },
			resolveFields: false,
		});
	}
	//4. if not, create a new cart item
	return await context.lists.CartItem.createOne({
		data: {
			product: { connect: { id: productId } },
			user: { connect: { id: sesh.itemId } },
		},
		resolveFields: false,
	});
}
export default addToCart;
