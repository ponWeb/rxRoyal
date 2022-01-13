"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport = require("passport");
const session = require("express-session");
const connectRedis = require("connect-redis");
const Redis = require("ioredis");
const common_1 = require("@nestjs/common");
const PORT = process.env.PORT || 5000;
const RedisStore = connectRedis(session);
const redisClient = new Redis(process.env.REDIS_URI, { tls: { rejectUnauthorized: false } });
exports.sessionMiddleware = session({
    secret: 'keyb',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: { maxAge: 2 * 86400 * 1000 }
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true
    }));
    app.setGlobalPrefix('api');
    app.use(exports.sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map