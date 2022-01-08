import { useMutation, useQuery, gql } from "@apollo/client";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($id: ID!) {
		Product(where: { id: $id }) {
			id
			name
			description
			price
		}
	}
`;

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			id: $id
			data: { name: $name, description: $description, price: $price }
		) {
			id
			name
			description
			price
		}
	}
`;

export default function UpdateProduct({ id }) {
	// 1. We need to get the existing product
	const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: { id },
	});
	// 2. We need to get the mutation to update the product
	const [
		updateProduct,
		{ data: updateData, error: updateError, loading: updateLoading },
	] = useMutation(UPDATE_PRODUCT_MUTATION);
	// {
	// variables: {
	//     id,
	// TODO: Pass in updates to product here
	// },
	// });
	// 2.5 Create state for form inputs
	const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
	console.log(inputs);
	if (loading) return <p> Loading...</p>;
	// 3. We need the form to handle the updates
	return (
		<Form
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await updateProduct({
					variables: {
						id,
						name: inputs.name,
						description: inputs.description,
						price: inputs.price,
					},
				}).catch(console.error);
				console.log(res);
				//submit input fields to the backend
				//TODO: handle submit
				// const res = await createProduct();
				// clearForm();
				//Go to product's page
				// Router.push({
				// 	pathname: `/product/${res.data.createProduct.id}`,
				// });
			}}
		>
			<DisplayError error={error || updateError} />
			<fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
				<button type="submit">Update Product</button>
			</fieldset>
		</Form>
	);
}
