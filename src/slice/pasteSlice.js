import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if(index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }

      toast("Paste Updated Successfully");

    },

    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => item.id === pasteId);

      if(index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast("Paste Deleted Successfully");
      }
    },

    resetAllPaste:(state) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, removeFromPaste, resetAllPaste } = pasteSlice.actions;

export default pasteSlice.reducer;
