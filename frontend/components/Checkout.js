import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import SickButton from './styles/SickButton'

const CheckoutFormStyles = styled.form`
	box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0, 0.04);
	border: 1px solid rgba(0, 0, 0, 0, 0.06);
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Checkout() {
    function handleSubmit(e) {
        //1.Stop form from submitting and turn loader on
        e.preventDefault();
        console.log("let's work on getting this in")
        //2. Start the page transition
        //3. Create the payment method via stripe (token comes back if successful)
        //4. Handle any errors from stripe
        //5. Send the token from step 3 to our keystone server, via a custom mutation
        //6. Change the page to view the order
        //7. Close Cart
        //8. Turn the loader off
    }

	return (
		<Elements stripe={stripeLib}>
			<CheckoutFormStyles onSubmit={handleSubmit}>
                <CardElement />
                <SickButton>Checkout</SickButton>
			</CheckoutFormStyles>
		</Elements>
	);
}
