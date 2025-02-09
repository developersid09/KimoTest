import { AsyncStorageUtil } from ".";


export const logoutFunction = async () => {
  await AsyncStorageUtil.storeItem("userId", "");
  await AsyncStorageUtil.storeItem("user", "");
  return true;
}

export const formatDateString = (time) => {
  console.log("time ", time);
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  let dateString = dt + '/' + month + '/' + year;

  console.log("date formated ", dt + '/' + month + '/' + year);
  return dateString;
}
