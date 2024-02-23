export default () => ({
  port: +process.env.PORT || 8080,
  environment: process.env.NODE_ENV,
  domains: process.env.ALLOWED_DOMAINS,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPDATE,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPDATE,
  database: process.env.DATABASE_URI
});
