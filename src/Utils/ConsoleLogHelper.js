// eslint-disable eslint-comments/no-unlimited-disable 
// import AppConstant from './Constants';
/* eslint-disable no-undef */
export default {
  log: (logMessage, data) => {
       // eslint-disable-next-line no-undef
    if (__DEV__) {
      console.log(logMessage, data);
    }
  },
};
