import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage, StorageKeys } from "../../utils/localStorage";

interface Order {
  id: number;
  items: { name: string; quantity: number, price: number }[];
  total: number;
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: getFromLocalStorage(StorageKeys.ORDERS, []),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveToLocalStorage(StorageKeys.ORDERS, [...state.orders]);

    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
