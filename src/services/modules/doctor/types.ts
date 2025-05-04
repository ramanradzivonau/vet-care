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
