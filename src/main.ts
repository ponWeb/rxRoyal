import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis';
import * as Redis from 'ioredis';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import sslRedirect from 'heroku-ssl-redirect'

const PORT = process.env.PORT || 5000

const RedisStore = connectRedis(session)
const redisClient = new Redis(process.env.REDIS_URI, { tls: { rejectUnauthorized: false } })

export const sessionMiddleware = session({
  secret: 'keyb',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 2 * 86400 * 1000
  }
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true
  }));
  app.enableCors({ credentials: true })
  app.use(cookieParser())
  app.use(sslRedirect())
  app.setGlobalPrefix('api')

  app.use(
    sessionMiddleware
  )

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT);
}
bootstrap();
