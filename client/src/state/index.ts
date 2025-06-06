import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },
        
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        count: item.count + 1
                    };
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    return {
                        ...item,
                        count: item.count - 1
                    };
                }
                return item;
            });
        },

        setIsCartOpen: (state, action) => {
            console.log('setIsCartOpen payload:', action.payload); // Debug
            state.isCartOpen = action.payload;
        }
    }
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions;

export default cartSlice.reducer;