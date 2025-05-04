import { fontFamilies } from "src/constants";

export const getFontFamily = (
  weight: "light" | "regular" | "medium" | "semiBold" | "bold" | "extraBold"
) => {
  return fontFamilies.MONTSERRAT[weight];
};
