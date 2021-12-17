import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyles = createGlobalStyle`
	@font-face {
	font-family: "Avenir Regular";
	src: url("/public/static/AvenirNextLTPro-Regular.otf")
	format(otf);
	font-weight: normal;
	font-style: normal;
}
html{
	--red: red;
	--black:#323232;
	--grey: #3a3a3a;
	--gray: var(--grey);
	--lightGrey: #e1e1e1;
	--lightGray: var(--lightGrey);
	--offWhite: #ededed;
	--maxWidth: 1000px;
	--boxShadow: '0 12px 24px 0 rgba(0,0,0,0,0.09';
	box-sizing: border-box;
}
*, *:before, *:after{
	box-sizing: inherit;
}
body {
	font-family: 'Avenir Regular', --apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		/* font-family: "Avenir Regular"; */
		padding: 0;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
}
a {
	text-decoration: none;
	color: var(---black);
}
a:hover{
	text-decoration: underline;
}
button {
	font-family: 'Avenir Regular', --apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
`;

const InnerStyles = styled.div`
	max-width: var(--maxWidth);
	margin: 0 auto;
	padding: 2rem;
`;

export default function Page({ children }) {
	return (
		<div>
			<GlobalStyles />
			<Header />
			<InnerStyles>{children}</InnerStyles>
		</div>
	);
}
Page.propTypes = {
	children: PropTypes.any,
};
