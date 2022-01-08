import Form from "./styles/Form";
import useForm from "../lib/useForm";
import { useMutation, gql } from "@apollo/client";
// import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!
		$name: String!
		$password: String!
	) {
		createUser(data: { email: $email, name: $name, password: $password }) {
			id
			email
			name
		}
	}
`;

export default function SignUp() {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		name: "",
		password: "",
	});
	//call the mutation, declare values
	const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
		//check currently logged in user with refetchQueries
		// refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});
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
	// const error =
	// 	data?.authenticateUserWithPassword.__typename ===
	// 	"UserAuthenticationWithPasswordFailure"
	// 		? data?.authenticateUserWithPassword
	// 		: undefined;
	return (
		//make sure password does not appear in URL with method "POST"
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Sign up!</h2>
			<DisplayError error={error} />
			<fieldset>
				{data?.createUser && (
					<p>Signed up with {data.createUser.email} - Please Sign In!</p>
				)}
				<label htmlFor="email">
					Your Name
					<input
						type="text"
						name="name"
						placeholder="Name"
						autoComplete="name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
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
