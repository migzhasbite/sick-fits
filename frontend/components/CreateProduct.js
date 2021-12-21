import gql from "graphql-tag";
import useForm from "../lib/useForm"
import Form from "./styles/Form";
import { useMutation } from "@apollo/client";
import { create } from "react-test-renderer";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import { Router } from 'next/router';


const CREATE_PRODUCT_MUTATION = gql `
    mutation CREATE_PRODUCT_MUTATION(
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ){
  createProduct (
    data:{
    name: $name,
    description: $description,
      price: $price, 
      status: "AVAILABLE"
      photo: {
          create: {
              image: $image,
              altText: $name
          }
      }

    }) {
    id
    price
    description
    name
  }
}
`

export default function CreateProduct() {
const { inputs, handleChange, clearForm, resetForm} = useForm({
    image: "",
    name: 'Nice Shoes',
    price: 34234,
    description: "these are some nice shoes",
});
const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{query: ALL_PRODUCTS_QUERY}],
});
// console.log(createProduct)
    return (
        <Form onSubmit={async (e)=>{
            e.preventDefault();
            //submit input fields on backend
            const res = await createProduct();
clearForm();
//Go to product's page
Router.push({
    pathname:`/product/${res.data.createProduct.id}`
});
        }}>
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
            {/* <button type="button" onClick={clearForm}>Clear Form</button> */}
            {/* <button type="button" onClick={resetForm}>Reset Form</button> */}
            <button type='submit'>+ Add Product</button>
                </fieldset>
        </Form>
    )
    
};
