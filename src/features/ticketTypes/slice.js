import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketTypes: [
    {
      id: 1,
      type: "Internet Issue",
      description: "Internet not connecting or slow",
    },
    {
      id: 2,
      type: "Printer Issue",
      description: "Printer is not working",
    },
  ],
};

export const ticketTypeSlice = createSlice({
  name: "ticketTypes",
  initialState,
  reducers: {
    setTicketTypeStore: (state, action) => {
      state.ticketTypes = [...action.payload];
    },
  },
});

export const { setTicketTypeStore } = ticketTypeSlice.actions;

export default ticketTypeSlice.reducer;
