import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MMKV } from "react-native-mmkv";
import {
  AppointmentsDataResponse,
  UserDataResponse,
  UserLoginDataResponse,
} from "src/services/modules/owner/types";
import { PetDataResponse } from "src/services/modules/pet/types";

type PetData = PetDataResponse;

interface UserState {
  id: number;
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  imageBase64?: string;
  petsList: PetData[];
  appointments: AppointmentsDataResponse;
}
const storage = new MMKV();

const initialState: UserState = {
  id: NaN,
  name: "",
  surname: "",
  email: "",
  telephoneNumber: "",
  imageBase64: undefined,
  petsList: [],
  appointments: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserLoginDataResponse>) => {
      storage.set("access_token", action.payload.token);
      storage.set("user_id", String(action.payload.owner.id));
      return {
        ...state,
        ...action.payload.owner,
      };
    },
    setUserData: (state, action: PayloadAction<UserDataResponse>) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        telephoneNumber: action.payload.telephoneNumber,
        imageBase64: action.payload.imageBase64,
        petsList: action.payload.petsList,
      };
    },
    addPetData: (state, action: PayloadAction<PetDataResponse>) => {
      return {
        ...state,
        petsList: [...state.petsList, action.payload],
      };
    },
    setAppointmentsData: (
      state,
      action: PayloadAction<AppointmentsDataResponse>
    ) => {
      return {
        ...state,
        appointments: action.payload,
      };
    },
    logout: () => {
      storage.delete("access_token");
      storage.delete("user_id");
      return initialState;
    },
  },
});

export const {
  loginUser,
  setUserData,
  setAppointmentsData,
  addPetData,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
