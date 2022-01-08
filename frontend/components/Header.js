import Link from "next/link";
import Nav from "./Nav";
import styled from "styled-components";
import Cart from "./Cart";

const LogoStyles = styled.h1`
	font-size: 4rem;
	margin-left: 2rem;
	position: relative;
	z-index: 2;
	transform: skew(-12deg);
	background: #323232;
	a {
		text-decoration: none;
		color: white;
		text-transform: uppercase;
		padding: 0.5rem 1rem;
	}
`;
const HeaderStyles = styled.header`
	.bar {
		border-bottom: 10px solid var(--black, #323232);
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
	}
	.sub-bar {
		display: grid;
		grid-template-columns: auto 1fr;
		border-bottom: 1px solid var(--black, #323232);
	}
`;

export default function Header() {
	return (
		<HeaderStyles>
			<div className="bar">
				<LogoStyles>
					<Link href="/">Sick Fits</Link>
				</LogoStyles>
				<Nav />
			</div>
			<div className="sub-bar">
				<Search />
			</div>
			<Cart />
		</HeaderStyles>
	);
}
