import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import ticketTypeSlice from "../features/ticketTypes/slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ticketType: ticketTypeSlice,
  },
});
