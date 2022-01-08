import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
// import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			code
			message
		}
	}
`;

export default function RequestReset() {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
	});
	//call the mutation, declare values
	const [signup, { data, loading, error }] = useMutation(
		REQUEST_RESET_MUTATION,
		{
			variables: inputs,
			//check currently logged in user with refetchQueries
			// refetchQueries: [{ query: CURRENT_USER_QUERY }],
		}
	);
	// console.log(error);
	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(inputs);
		const res = await signup().catch(console.error);
		console.log(res);
		console.log({ data, loading, error });
		resetForm();
		//send email/password to graphQL
	}
	return (
		//make sure password does not appear in URL with method "POST"
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Request Password Reset</h2>
			<DisplayError error={error} />
			<fieldset>
				{data?.sendUserPasswordResetLink === null && (
					<p>Success! Check your email for a link.</p>
				)}
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your email address"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Request Reset</button>
			</fieldset>
		</Form>
	);
}
