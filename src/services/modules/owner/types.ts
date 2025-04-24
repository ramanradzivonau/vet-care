export type OwnerDataRequest = {
  name: string;
  surname: string;
  email: string;
  telephoneNumber: string;
  login: string;
  password: string;
  imageBase64: string;
};

export type OwnerDataResponse = {
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
