import { Platform } from "react-native";

export const fontFamilies = {
  IBMPlexMono: {
    regular: Platform.OS == 'ios' ? 'IBMPlexMono-Regular' : 'IBMPlexMono-Regular',
    bold: Platform.OS == 'ios' ? 'IBMPlexMono-Bold' : 'IBMPlexMono-Bold',
    boldItalic: Platform.OS == 'ios' ? 'IBMPlexMono-BoldItalic' : 'IBMPlexMono-BoldItalic',
    italic: Platform.OS == 'ios' ? 'IBMPlexMono-Italic' : 'IBMPlexMono-Italic',
  },
};

export const timeoutConst = {
  VALUE_8000: 8000,
  VALUE_5000: 5000
};

export const CommonConstant = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  NODATA: "NODATA",
  BADREQUEST: "BADREQUEST",
  ALREADYEXIST: "ALREADYEXIST",
  INTERNALSERVERERROR: "INTERNALSERVERERROR",
  UNAUTHORISED: "UNAUTHORISED",
}

export const NetworkCallExecutionStatus = {
  fetching: "fetching",
  succeed: "succeed",
  failed: "failed",
};