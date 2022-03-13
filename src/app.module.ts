import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { GameModule } from './game/game.module';
import { MessageModule } from './message/message.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 50,
    }),
    GameModule,
    AuthModule,
    UserModule,
    MessageModule,
    PassportModule.register({ session: true }),
    ScheduleModule.forRoot(),
    TransactionModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    })
  ],
  providers: []
})
export class AppModule { }
