import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const newItem = action.payload;
            const nowItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);
            const cartItems = nowItem
                ? state.cart.cartItems.map((item) => item.name === nowItem.name ? newItem : item )
                : [...state.cart.cartItems, newItem];
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems
                }
            }
        }
        case 'REMOVE': {
            const cartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug);
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems
                }
            }
        }
        default:
            return state;
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch};
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}