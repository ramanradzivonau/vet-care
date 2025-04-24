import { api } from "../../api";
import {
  LoginDataResponse,
  OwnerDataRequest,
  OwnerDataResponse,
} from "./types";

export const ownerApi = api.injectEndpoints({
  endpoints: build => ({
    registration: build.query<OwnerDataResponse, OwnerDataRequest>({
      query: ({ ...body }) => ({
        url: `owner`,
        method: "POST",
        body,
      }),
    }),
    login: build.query<OwnerDataResponse, LoginDataResponse>({
      query: ({ ...body }) => ({
        url: `owner/login`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyRegistrationQuery, useLazyLoginQuery } = ownerApi;
