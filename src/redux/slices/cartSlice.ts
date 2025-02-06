import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage, StorageKeys } from "../../utils/localStorage";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: getFromLocalStorage(StorageKeys.CART_ITEMS,[]),
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(StorageKeys.CART_ITEMS, state.items);
      state.total += action.payload.price;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        state.total -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
        saveToLocalStorage(StorageKeys.CART_ITEMS, state.items);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        state.total += (action.payload.quantity - item.quantity) * item.price;
        item.quantity = action.payload.quantity;
      } else if (item && action.payload.quantity === 0) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
      saveToLocalStorage(StorageKeys.CART_ITEMS, state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveToLocalStorage(StorageKeys.CART_ITEMS, []);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
