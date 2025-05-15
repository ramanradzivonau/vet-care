import { MMKV } from "react-native-mmkv";
import { api } from "../../api";
import {
  LoginDataResponse,
  UserDataRequest,
  UserLoginDataResponse,
  UserDataResponse,
  AppointmentDataRequest,
  AppointmentsDataResponse,
} from "./types";

const storage = new MMKV();

export const ownerApi = api.injectEndpoints({
  endpoints: build => ({
    registration: build.query<UserLoginDataResponse, UserDataRequest>({
      query: ({ ...body }) => ({
        url: `owner`,
        method: "POST",
        body,
      }),
    }),
    login: build.query<UserLoginDataResponse, LoginDataResponse>({
      query: ({ ...body }) => ({
        url: `owner/login`,
        method: "POST",
        body,
      }),
    }),
    getUserData: build.query<UserDataResponse, void>({
      query: () => ({
        url: `owner/${storage.getString("user_id")}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${storage.getString("access_token")}`,
        },
      }),
    }),
    makeAppointment: build.query<void, AppointmentDataRequest>({
      query: ({ ...body }) => ({
        url: `appointment`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${storage.getString("access_token")}`,
        },
        body,
      }),
    }),
    getAppointments: build.query<AppointmentsDataResponse, void>({
      query: () => ({
        url: `appointment/owner/${storage.getString("user_id")}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${storage.getString("access_token")}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyRegistrationQuery,
  useLazyLoginQuery,
  useLazyGetUserDataQuery,
  useLazyMakeAppointmentQuery,
  useLazyGetAppointmentsQuery,
} = ownerApi;
