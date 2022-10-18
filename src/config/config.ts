const { env } = process

const isProd = env.NODE_ENV === 'production'
const isTest = env.NODE_ENV === 'test'

if (isTest)
  /* eslint-disable */
  require('dotenv').config({
    path: '.env.test',
  })

if (!isProd && !isTest) require('dotenv').config()

export default {
  isProd,
  logLevel: env.LOG_LEVEL ? env.LOG_LEVEL : 'info',
  port: parseInt(env.PORT) || 6060,
  db: {
    url: env.DATABASE_URL,
  },
  redis: {
    url: env.REDIS_URL,
  },
  auth0: {
    issuerUrl: env.AUTH0_ISSUER_URL,
    audience: env.AUTH0_AUDIENCE,
  },
}
