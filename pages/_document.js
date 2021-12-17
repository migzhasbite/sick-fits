import Document, { Html, Head, NextScript, Main } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(
			(App) => (props) =>
				//go through every single component that needs to be rendered out to the page
				//retrieve the css it needs to render to server
				sheet.collectStyles(<App {...props} />)
		);
		const styleTags = sheet.getStyleElement();
		console.log(styleTags);
		return { ...page, styleTags };
	}
	render() {
		return (
			<Html lang="en-US">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
