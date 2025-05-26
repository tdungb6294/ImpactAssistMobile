declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    API_BASE_URL: string;
    REFRESH_ENDPOINT: string;
    API_USERNAME: string;
    API_PASSWORD: string;
  }
}
