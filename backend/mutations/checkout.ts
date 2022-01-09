import { KeystoneContext } from "@keystone-next/types";
import { OrderCreateInput } from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

const graphql = String.raw;
interface Arguments {
	token: string;
}

async function checkout(
	root: any,
	// { token }: { token: string },
	{ token }: Arguments,
	context: KeystoneContext
): Promise<OrderCreateInput> {
	//1. Make sure user is signed in
	const userId = context.session.itemId;
	if (!userId) {
		throw new Error("Sorry! You must be signed in to create an order.");
	}
	//1.5 Query current user
	const user = await context.lists.User.findOne({
		where: { id: userId },
		resolveFields: graphql`
        id
        name
        email
        cart {
            id
            quantity
            product{
                name
                price
                description
                id
            }photo {
                id
                image {
                    id
                    publicUrlTransformed
                }
            }

        }
        `,
	});
	console.dir(user, { depth: null });
	//2. Calc total price
	const cartItems = user.cart.filter((cartItem) => cartItem.product);
	const amount = cartItems.reduce(function (
		tally: Number,
		cartItem: CartItemCreateInput
	) {
		return tally + cartItem.quantity * cartItem.product.price;
	},
	0);
	console.log(amount);
	//3. Create charge with stripe lib (import stripelib)
	const charge = await stripeConfig.paymentIntents
		.create({
			amount,
			currency: "USD",
			confirm: true,
			payment_method: token,
		})
		.catch((err) => {
			console.log(err);
			throw new Error(err.message);
		});
	//4. Convert cartItems to OrderItems
	//5. Create the order and return it
}

export default checkout;
