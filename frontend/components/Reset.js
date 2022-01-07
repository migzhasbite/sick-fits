import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
// import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const RESET_MUTATION = gql`
	mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
		redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
			code
			message
		}
	}
`;

export default function Reset({token}) {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		password: "",
		token,
	});
	//call the mutation, declare values
	const [reset, { data, loading, error }] = useMutation(
		RESET_MUTATION,
		{
			variables: inputs,
		}
	);
    const successfulError = data?.redeemUserPasswordResetToken?.code ?
    data?.redeemUserPasswordResetToken : undefined;
	// console.log(error);
	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(inputs);
		const res = await reset().catch(console.error);
		console.log(res);
		console.log({ data, loading, error });
		resetForm();
		//send email/password to graphQL
	}
	return (
		//make sure password does not appear in URL with method "POST"
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Reset your password</h2>
			<DisplayError error={error || successfulError} />
			<fieldset>
				{data?.redeemUserPasswordResetToken === null && (
					<p>Success! You can now sign in.</p>
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

				<button type="submit">Request Reset</button>
			</fieldset>
		</Form>
	);
}
