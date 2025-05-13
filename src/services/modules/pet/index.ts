import { MMKV } from "react-native-mmkv";
import { api } from "../../api";
import { PetDataRequest, PetDataResponse } from "./types";

const storage = new MMKV();

export const petApi = api.injectEndpoints({
  endpoints: build => ({
    addPet: build.query<PetDataResponse, PetDataRequest>({
      query: ({ ...body }) => ({
        url: `pet`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${storage.getString("access_token")}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyAddPetQuery } = petApi;
