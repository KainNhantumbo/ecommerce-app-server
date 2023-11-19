export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV,
  domains: process.env.ALLOWED_DOMAINS,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPDATE,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPDATE,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  }
});
