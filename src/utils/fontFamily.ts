import { fontFamilies } from "src/constants";

export const getFontFamily = (weight: "semiBold" | "bold" | "extraBold") => {
  return fontFamilies.MONTSERRAT[weight];
};
