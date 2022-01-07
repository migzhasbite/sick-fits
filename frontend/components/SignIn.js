import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

export default function SignIn() {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		password: "",
	});
	//call the mutation, declare values
	const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		//check currently logged in user with refetchQueries
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});
	// console.log(error);
	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(inputs);
		const res = await signin();
		console.log(res);
		resetForm();
		//send email/password to graphQL
	}
	const error =
		data?.authenticateUserWithPassword.__typename ===
		"UserAuthenticationWithPasswordFailure"
			? data?.authenticateUserWithPassword
			: undefined;
	return (
		//make sure password does not appear in URL with method "POST"
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Sign into your account!</h2>
			<DisplayError
				error={error}
			/>
			<fieldset>
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
				<label htmlFor="password">
					Password
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign In</button>
			</fieldset>
		</Form>
	);
}
