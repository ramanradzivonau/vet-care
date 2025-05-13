export type Gender = "М" | "Ж";

export enum PetTypes {
  Dog = "dog",
  Cat = "cat",
  Parrot = "parrot",
  Rabbit = "rabbit",
  Cavy = "cavy",
  Turtle = "turtle",
}

export type PetDataRequest = {
  name: string;
  type: PetTypes;
  breed: string;
  dateOfBirth: string;
  gender: Gender;
  weight: number;
  passport: string;
  idOwn: number;
  imageBase64: string;
};

export type PetDataResponse = {
  id: number;
  name: string;
  type: PetTypes;
  breed: string;
  dateOfBirth: Date;
  gender: Gender;
  weight: number;
  passport: string;
  imageBase64: string;
  status: string;
  vetCardsList: [];
  appointments: [];
};
