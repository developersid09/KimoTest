/* eslint-disable no-undef */
import axios from "axios";
import { AsyncStorageUtil } from "../Utils";
import { CommonConstant } from "../Utils/Constants";


let headers = {
  Authorization: "JWT",
  Accept: "application/json",
  "Content-Type": "application/json",
};

const NETWORK_TIMEOUT = 30 * 1000;
export default class NetworkManager {

  static NetworkGet = async (url, header, callBack) => {
    let headerInfo = await AsyncStorageUtil.getItem("authorization");
    let parsedHeaderInfo = JSON.parse(headerInfo);
    console.log("parsedHeaderInfo?.authorization ", parsedHeaderInfo);
    headers.Authorization = 'Bearer ' + parsedHeaderInfo;

    console.log("headers ", headers)
    axios
      .get(url, { headers: headers }, { timeout: NETWORK_TIMEOUT })
      .then((response) => {
        console.log(
          "\nRESPONSE : ",
          JSON.stringify(response) + "\n--------------------\n"
        );
        callBack(response?.data);
      })
      .catch((error) => {
        let status = error?.response?.status
        console.log(
          "\nERROR : ",
          JSON.stringify(error?.response) + "\n--------------------\n"
        );
        switch (status) {
          case 400:
            callBack(CommonConstant.BADREQUEST);
            break;
          case 401:
            if (error?.response?.data?.error == 'Invalid token') {
              logoutFunction();
            }
            callBack(CommonConstant.UNAUTHORISED);
            break;
          case 404:
            callBack(CommonConstant.NOTFOUND);
            break;
          case 422:
            callBack(CommonConstant.ALREADYEXIST);
            break;
          case 500:
            callBack(CommonConstant.INTERNALSERVERERROR, error?.response?.data?.message);
            break;
          default:
            callBack(CommonConstant.ERROR);
        }
      });
  };

  static NetworkPost = async (url, param, header, callBack) => {
    let headerInfo = await AsyncStorageUtil.getItem("authorization");
    let parsedHeaderInfo = JSON.parse(headerInfo);
    console.log("parsedHeaderInfo?.authorization ", parsedHeaderInfo);
    headers.Authorization = 'Bearer ' + parsedHeaderInfo;

    console.log("headers ", header)
    axios
      .post(url, param, { headers: header ? header : headers }, { timeout: NETWORK_TIMEOUT })
      .then((response) => {
        console.log(
          "\nRESPONSE : ",
          JSON.stringify(response.status) + "\n--------------------\n"
        );
        callBack(response?.data);
      })
      .catch((error) => {
        let status = error?.response?.status
        console.log(
          "\nERROR : ",
          JSON.stringify(error?.response) + "\n--------------------\n"
        );
        switch (status) {
          case 400:
            callBack(CommonConstant.BADREQUEST);
            break;
          case 401:
            callBack(CommonConstant.UNAUTHORISED);
            break;
          case 404:
            callBack(CommonConstant.NOTFOUND);
            break;
          case 422:
            callBack(CommonConstant.ALREADYEXIST);
            break;
          case 500:
            callBack(CommonConstant.INTERNALSERVERERROR, error?.response?.data?.message);
            break;
          default:
            callBack(CommonConstant.ERROR);
        }
      });
  };
}
