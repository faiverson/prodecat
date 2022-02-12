import { load } from 'ts-dotenv'

const env = load({
    APP_PORT: Number,
    ADMIN_PASSWORD: String,
    APP_ENV: [
      'development' as const,
      'production' as const,
    ],
    NODE_ENV: [
      'development' as const,
      'production' as const,
    ],
})

export default env