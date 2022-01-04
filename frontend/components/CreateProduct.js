import { useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Router from "next/router";
import { ALL_PRODUCTS_QUERY } from "./Products";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import gql from "graphql-tag";

const CREATE_PRODUCT_MUTATION = gql`
#must give mutation a name, making it a flexible mutation to pass in dynamic variables
	mutation CREATE_PRODUCT_MUTATION(
# which variables are getting passed in, and what types are they
#! at the end of property means required
		$name: String!
		$description: String!
		$price: Int!
		$image: Upload
	) {
		createProduct(
			data: {
				name: $name
				description: $description
				price: $price
				status: "AVAILABLE"
				photo: { create: { image: $image, altText: $name } }
			}
		) {
			id
			price
			description
			name
		}
	}
`;

export default function CreateProduct() {
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		image: "",
		name: "Stuff",
		price: 0,
		description: "Stuff I'm Testing",
	});
	const [createProduct, { loading, error, data }] = useMutation(
		CREATE_PRODUCT_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
		}
	);
	// console.log(createProduct)
	return (
		<Form
			onSubmit={async (e) => {
				e.preventDefault();
				//submit input fields to the backend
				const res = await createProduct();
				clearForm();
				//Go to product's page
				Router.push({
					pathname: `/product/${res.data.createProduct.id}`,
				});
			}}
		>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="image">
					Image
					<input
						required
						type="file"
						id="name"
						name="image"
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="name">
					Name
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="price">
					Price
					<input
						type="number"
						id="price"
						name="price"
						placeholder="Price"
						value={inputs.price}
						onChange={handleChange}
						// disabled
					/>
				</label>
				<label htmlFor="description">
					Description
					<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={inputs.description}
						onChange={handleChange}
						// disabled
					/>
				</label>
				<button type="submit">+ Add Product</button>
			</fieldset>
		</Form>
	);
}

export { CREATE_PRODUCT_MUTATION };
