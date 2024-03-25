import jwt from "jsonwebtoken";
import configData from "../../config/app";

export const getUserAuthTokens = function (userData) {
  let user = {
    id: userData._id,
    username: userData.username,
    email: userData.email,
  };

  let tokenSecret = configData.jwt.token_secret + userData.password;
  let refreshTokenSecret = configData.jwt.refresh_token_secret + userData.password;

  const token = jwt.sign(user, tokenSecret, {
    expiresIn: configData.jwt.token_life,
  });

  const refreshToken = jwt.sign(user, refreshTokenSecret, {
    expiresIn: configData.jwt.refresh_token_life,
  });
  return {
    token,
    refreshToken,
  };
};