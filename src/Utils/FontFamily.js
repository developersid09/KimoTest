import { fontFamilies } from "./Constants";


export const getFontFamily = (weight) => {
    const selectedFontFamily = fontFamilies.IBMPlexMono
    console.log("selectedFontFamily ", selectedFontFamily[weight]);
    return selectedFontFamily[weight];
};