import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport'
import * as session from 'express-session'
import * as connectRedis from 'connect-redis';
import * as Redis from 'ioredis';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import sslRedirect from 'heroku-ssl-redirect'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  const PORT = config.get('PORT') || 5000

  const RedisStore = connectRedis(session)
  const redisUrl = config.get('REDIS_URI')
  const redisClient = new Redis(redisUrl, { tls: { rejectUnauthorized: false } })

  const sessionMiddleware = session({
    secret: config.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      maxAge: 2 * 86400 * 1000,
      secure: true,
      httpOnly: true
    }
  })

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  }))
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
