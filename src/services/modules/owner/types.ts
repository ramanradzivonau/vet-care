import { PetDataResponse } from "../pet/types";

export type UserDataRequest = {
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  login: string;
  password: string;
  imageBase64: string;
};

export type LoginDataResponse = {
  email: string;
  password: string;
};

export type UserLoginDataResponse = {
  owner: {
    id: number;
    name: string;
    surname: string;
    email: string;
    telephoneNumber: string;
    imageBase64: string;
  };
  token: string;
};

export type UserDataResponse = UserLoginDataResponse["owner"] & {
  petsList: PetDataResponse[];
};

export type AppointmentDataRequest = {
  doctorId: number;
  petId: number;
  ownerId: number;
  dateTime: string;
};

export type AppointmentDataResponse = {
  id: number;
  dateTime: string;
  durationMinutes: number;
  status: string;
};
