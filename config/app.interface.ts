export interface AppConfigInterface {
    app: {
      port: number,
      api_version: string,
    },
    db: {
      mongo_connection_string: string,
    },
    jwt: {
      token_secret: string,
      token_life: number,
      refresh_token_secret: string,
      refresh_token_life: number,
    }
  }