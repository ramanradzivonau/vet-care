import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MMKV } from "react-native-mmkv";
import { OwnerDataResponse } from "src/services/modules/owner/types";

interface OwnerState {
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  login: string;
  imageBase64?: string;
}
const storage = new MMKV();

const initialState: OwnerState = {
  name: "",
  surname: "",
  email: "",
  telephoneNumber: "",
  login: "",
  imageBase64: undefined,
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setOwner: (state, action: PayloadAction<OwnerDataResponse>) => {
      storage.set("access_token", action.payload.token);
      return {
        ...state,
        ...action.payload.owner,
      };
    },
    logout: () => {
      storage.delete("access_token");
      return initialState;
    },
  },
});

export const { setOwner, logout } = ownerSlice.actions;
export default ownerSlice.reducer;
