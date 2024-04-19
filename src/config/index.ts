const constants = {
  ACCESS_TOKEN_KEY: 'access-token',
  REFRESH_TOKEN_KEY: 'refresh-token',
  WS_TOKEN_KEY: 'ws-token',
  DEVICE_ID_KEY: 'device-id',
};

export const config = {
  ...constants,
  NODE_ENV: process.env.ENV || process.env.NODE_ENV,
  WEB_URL: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
  BACKEND_WS_URL:
    process.env.NEXT_PUBLIC_BACKEND_WS_URL || 'ws://localhost:4000',
  // BUCKET_IMAGE_URL:
  //   process.env.NEXT_PUBLIC_BUCKET_IMAGE_URL ||
  //   'https://testbuckets.child-lab.jp',
};
