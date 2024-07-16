/* eslint-disable no-undef */
import axios from "axios";
// import { useNavigation } from '@react-navigation/native';
import { AsyncStorageUtil } from "../Utils";
import { CommonConstant } from "../Utils/Constants";


let headers = {
  Authorization: "JWT",
  Accept: "application/json",
  "Content-Type": "application/json",
};

const NETWORK_TIMEOUT = 30 * 1000;
export default class NetworkManager {
  ////// IDFC server

  static IDFCNetworkGet = async (url, header, callBack) => {
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

  static IDFCNetworkPost = async (url, param, header, callBack) => {
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

  // static IDFCNetworkPut = async (url, param, header, callBack) => {
  //   try {
  //     let headerInfo = await AsyncStorageUtils.getItem(LocalDB.headerInfo);
  //     let parsedHeaderInfo = JSON.parse(headerInfo);
  //     headers.Authorization = parsedHeaderInfo.authorization;
  //     headers.agentId = parsedHeaderInfo.agentId;
  //     headers.appName = header != null ? header.appName : "";
  //     headers.mobileNumber = header != null ? header.mobileNumber : "";
  //   } catch (e) {
  //     callBack(e);
  //   }
  //   callBack('');
  //   // axios
  //   //   .put(url, param, { headers: headers }, { timeout: NETWORK_TIMEOUT })
  //   //   .then((response) => {
  //   //     callBack(response?.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     let status = error?.response?.status
  //   //     console.log(
  //   //       "\nERROR : ",
  //   //       JSON.stringify(error?.response) + "\n--------------------\n"
  //   //     );
  //   //     switch (status){
  //   //       case 400:
  //   //         callBack(CommonConstant.BADREQUEST);
  //   //         break;
  //   //       case 401:
  //   //         callBack(CommonConstant.UNAUTHORISED);
  //   //         break;
  //   //       case 404:
  //   //         callBack(CommonConstant.NOTFOUND);
  //   //         break;
  //   //       case 500:
  //   //         callBack(CommonConstant.INTERNALSERVERERROR,error?.response?.data?.message);
  //   //         break;
  //   //       default:
  //   //         callBack(CommonConstant.ERROR);
  //   //     }
  //   //   });
  // };
  // static IDFCNetworkDelete = async (url, header, callBack) => {
  //   try {
  //     let headerInfo = await AsyncStorageUtils.getItem(LocalDB.headerInfo);
  //     let parsedHeaderInfo = JSON.parse(headerInfo);
  //     headers.Authorization = parsedHeaderInfo.authorization;
  //     headers.agentId = parsedHeaderInfo.agentId;
  //     headers.appName = header != null ? header.appName : "";
  //     headers.mobileNumber = header != null ? header.mobileNumber : "";
  //   } catch (e) {
  //     callBack(e);
  //   }
  //   callBack('');

  //   // axios
  //   //   .delete(url, { headers: headers }, { timeout: NETWORK_TIMEOUT })
  //   //   .then((response) => {
  //   //     callBack(response?.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     let status = error?.response?.status
  //   //     console.log(
  //   //       "\nERROR : ",
  //   //       JSON.stringify(error?.response) + "\n--------------------\n"
  //   //     );
  //   //     switch (status){
  //   //       case 400:
  //   //         callBack(CommonConstant.BADREQUEST);
  //   //         break;
  //   //       case 401:
  //   //         callBack(CommonConstant.UNAUTHORISED);
  //   //         break;
  //   //       case 404:
  //   //         callBack(CommonConstant.NOTFOUND);
  //   //         break;
  //   //       case 500:
  //   //         callBack(CommonConstant.INTERNALSERVERERROR,error?.response?.data?.message);
  //   //         break;
  //   //       default:
  //   //         callBack(CommonConstant.ERROR);
  //   //     }
  //   //   });
  // };

  // static IDFCNetworkPostWithoutHeader = async (url, params, callBack) => {
  //   callBack('');
  //   // axios
  //   //   .post(url, params, { headers: headers }, { timeout: NETWORK_TIMEOUT })
  //   //   .then((response) => {
  //   //     console.log(
  //   //       "\nRESPONSE : ",
  //   //       JSON.stringify(response?.data) + "\n--------------------\n"
  //   //     );
  //   //     callBack(response?.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(
  //   //       "\nERROR : ",
  //   //       JSON.stringify(error) + "\n--------------------\n"
  //   //     );
  //   //     callBack(JSON.stringify(error));
  //   //   });
  // };
}
