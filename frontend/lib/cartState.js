import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;
function CartStateProvider({ children }) {
	//This is our own custom provider.
	//we will store data (state) and functionality (updates) in here and anyone can access it via the consumer

	//closed by default
	const [cartOpen, setCartOpen] = useState(false);

	function toggleCart() {
		setCartOpen(!cartOpen);
	}
	function closeCart() {
		setCartOpen(false);
	}
	function openCart() {
		setCartOpen(true);
	}
	return (
		<LocalStateProvider
			value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
		>
			{children}
		</LocalStateProvider>
	);
}
//make custom hook to access cart local state
function useCart() {
	//useContext is the consumer end
	const all = useContext(LocalStateContext);
	return all;
}
export { CartStateProvider, useCart };
