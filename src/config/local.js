const PORT = "3001";

export const config = {
  AUTH_SIGNIN_ENDPOINT: `http://localhost:${PORT}/api/signin`,
  AUTH_SIGNUP_ENDPOINT: `http://localhost:${PORT}/api/signup`,
  AUTH_SIGNOUT_ENDPOINT: `http://localhost:${PORT}/api/signout`,
  API_REGISTER_ENDPOINT: `http://localhost:${PORT}/api/stylist`,
  API_STYLIST_ZIP_ENDPOINT: `http://localhost:${PORT}/api/stylist/zip`,
  API_ARTIST_PROFILE_ENDPOINT: `http://localhost:${PORT}/api/stylist/`
};
