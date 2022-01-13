import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { cloudinaryImage } from "@keystone-next/cloudinary";
import "dotenv/config";
import { isSignedIn, permissions } from "../seed-data/access";

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
export const cloudinary = {
	cloudName: process.env.CLOUDINARY_CLOUD_NAME,
	apiKey: process.env.CLOUDINARY_KEY,
	apiSecret: process.env.CLOUDINARY_SECRET,
	folder: "sickfits",
};

export const ProductImage = list({
	access: {
		create: isSignedIn,
		read: () => true,
		update: permissions.canManageProducts,
		delete: permissions.canManageProducts,
	},
	fields: {
		image: cloudinaryImage({
			cloudinary,
			label: "Source",
		}),
		altText: text(),
		//reference to product data type and photo field that is on product
		product: relationship({ ref: "Product.photo" }),
	},
	ui: {
		listView: {
			initialColumns: ["image", "altText", "product"],
		},
	},
});
