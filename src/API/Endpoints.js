
var BASE_URL = 'https://chotyajahirati.in/api/v1/';
var IAMGE_DOMAIN = 'https://chotyajahirati.in';
export const FIREBASE_SENDER_ID = "154794588260";
// var AUTH_USER_URL = 'https://internal-app.uat-entauth.abc.com/api/';


const Endpoints = {
  signUpUser: `${BASE_URL}auth/email/register`,
  signUpAgent: `${BASE_URL}auth/email/register`,
  loginApi: `${BASE_URL}auth/mobile/login`,
  publishAds: `${BASE_URL}ads`,
  getMyAds: `${BASE_URL}ads?userId=`,
  getViewAds: `${BASE_URL}ads`,
  getUserInfo: `${BASE_URL}users/`,
  profileImageUpload: `${BASE_URL}files/upload`,
  imageDomain: IAMGE_DOMAIN,

  getDistricts: `${BASE_URL}users/locations?type=districts`,
  getTahasil: `${BASE_URL}users/locations?type=subDistricts&district=`,
  getVillages: `${BASE_URL}users/locations?type=villages&district=`,




  ///
  // google_api_key: GOOGLE_API_KEY,
  // keepAlive: `${AUTH_URL}session-management/v1/session/keepalive`,
  // accessToken: `${AUTH_URL}auth-service/v1/token/exchange`,
  // accessTokenValidation: `${AUTH_URL}session-management/v1/session/isvalid`,
  // accessTokenLogout: `${AUTH_URL}session-management/v1/session/logout`,
  // userInfo: `${AUTH_USER_URL}internal/session-management/v1/session/userinfo`,
  // authorizationEndpoint: `${AUTH_PLATFORM_URL}oauth/oauth2/auth`,


};

export default Endpoints;
