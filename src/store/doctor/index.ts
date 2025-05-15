import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DoctorsDataResponse } from "src/services/modules/doctor/types";

interface OwnerState {
  doctorsByCategory: DoctorsDataResponse;
}

const initialState: OwnerState = {
  doctorsByCategory: [],
};

const doctorSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<DoctorsDataResponse>) => {
      return {
        ...state,
        doctorsByCategory: action.payload,
      };
    },
  },
});

export const { setDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
