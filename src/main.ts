import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport'
import session from 'express-session'
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { ValidationPipe } from '@nestjs/common';
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
    rolling: true,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      maxAge: 2 * 86400 * 1000
    }
  })

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        connectSrc: ["'self'", 'https://ssc-dao.genesysgo.net/'],
        scriptSrc: ["'self'", "'unsafe-inline'"]
      }
    }
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true
  }));
  app.enableCors({ credentials: true })
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
