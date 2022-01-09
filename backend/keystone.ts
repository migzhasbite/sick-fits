import { createSchema, config } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import "dotenv/config";
import { User } from "./schemas/User";
import {
	withItemData,
	statelessSessions,
} from "@keystone-next/keystone/session";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { insertSeedData } from "./seed-data";
import { sendPasswordResetEmail } from "./lib/mail";
import { CartItem } from "./schemas/CartItem";
import { extendGraphqlSchema } from "./mutations";
import { OrderItem } from "./schemas/OrderItem";
import { Order } from "./schemas/Order";

const databaseURL =
	process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, //how long user stays logged in
	secret: process.env.COOKIE_SECRET,
};
const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",

	initFirstItem: {
		fields: ["name", "email", "password"],
		//TODO: Add in initial roles here
	},
	passwordResetLink: {
		async sendToken(args) {
			console.log(args);
			//send the email
			await sendPasswordResetEmail(args.token, args.identity);
		},
	},
});

export default withAuth(
	config({
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
		},
		db: {
			adapter: "mongoose",
			url: databaseURL,
			//TODO: add data seeding here
			async onConnect(keystone) {
				console.log("Connected to database");
				if (process.argv.includes("--seed-data")) {
					await insertSeedData(keystone);
				}
			},
		},
		lists: createSchema({
			//Schema items in here
			User,
			Product,
			ProductImage,
			CartItem,
			OrderItem,
			Order,
		}),
		extendGraphqlSchema: extendGraphqlSchema,
		ui: {
			//show UI only for people who pass this test

			isAccessAllowed: ({ session }) => {
				// console.log(session);
				return !!session?.data;
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			//GraphQL query
			User: "id name email",
		}),
	})
);
