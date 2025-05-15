import { CATEGORIES } from "src/screens/Home/types";

export type DoctorData = {
  id: number;
  imageBase64: string;
  fullName: string;
  hashTags: string[];
  description: string;
  schedule: string[];
};

export type DoctorsDataResponse = Array<{
  specialisation: CATEGORIES;
  doctors: DoctorData[];
}>;

export type DoctorScheduleDataResponse = Array<{
  date: string;
  isWorkingDay: boolean;
  booked: string[];
  from: string;
  to: string;
  notAvailable: string[];
}>;
