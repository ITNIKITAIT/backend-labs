export const jwtConstants = {
  access_secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
  refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
};
