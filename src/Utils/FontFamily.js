import { fontFamilies } from "./Constants";


export const getFontFamily = (weight) => {
    const selectedFontFamily = fontFamilies.IBMPlexMono
    return selectedFontFamily[weight];
};