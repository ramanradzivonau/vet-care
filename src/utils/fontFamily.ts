import { fontFamilies } from "src/constants";

export const getFontFamily = (weight: "semiBold" | "extraBold") => {
  return fontFamilies.MONTSERRAT[weight];
};
