import { api } from "../../api";
import { OwnerDataRequest, OwnerDataResponse } from "./types";

export const ownerApi = api.injectEndpoints({
  endpoints: build => ({
    registration: build.query<OwnerDataResponse, OwnerDataRequest>({
      query: ({ ...body }) => ({
        url: `owner`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyRegistrationQuery } = ownerApi;
