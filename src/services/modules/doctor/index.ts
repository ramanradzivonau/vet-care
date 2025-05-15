import { MMKV } from "react-native-mmkv";
import { api } from "../../api";
import { DoctorScheduleDataResponse, DoctorsDataResponse } from "./types";

const storage = new MMKV();

export const ownerApi = api.injectEndpoints({
  endpoints: build => ({
    getAllDoctors: build.query<DoctorsDataResponse, void>({
      query: () => ({
        url: `doctor/by-specialisation`,
        headers: {
          Authorization: `Bearer ${storage.getString("access_token")}`,
        },
      }),
    }),
    getDoctorSchedule: build.query<DoctorScheduleDataResponse, { id: number }>({
      query: ({ id }) => ({
        url: `schedule/doctor/${id}`,
        headers: {
          Authorization: `Bearer ${storage.getString("access_token")}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetAllDoctorsQuery, useLazyGetDoctorScheduleQuery } =
  ownerApi;
