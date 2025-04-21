import { fontFamilies } from "src/constants";

export const getFontFamily = (
  weight: "light" | "regular" | "semiBold" | "bold" | "extraBold"
) => {
  return fontFamilies.MONTSERRAT[weight];
};
