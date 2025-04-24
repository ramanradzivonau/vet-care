import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { MMKV } from "react-native-mmkv";
import Toast from "react-native-toast-message";

const storage = new MMKV();

export const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:8080/",
  // baseUrl: "http://192.168.31.12:8080/",
  baseUrl: "http://10.0.2.2:8080/",
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.log("Запрос завершился с ошибкой:", result.error);
    Toast.show({
      type: "error",
      text1: "Ошибка запроса",
      text2:
        result.error.data?.errorMessage ||
        result.error.error ||
        "Что-то пошло не так",
    });
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  refetchOnMountOrArgChange: false,
  endpoints: () => ({}),
});
