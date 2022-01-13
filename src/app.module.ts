import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { GameModule } from './game/game.module';
import { MessageModule } from './message/message.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'clientBuild'),
    }),
    GameModule,
    AuthModule,
    UserModule,
    MessageModule,
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    ScheduleModule.forRoot(),
    TasksModule,
    TransactionModule,
    MongooseModule.forRoot("mongodb+srv://admin:ibH1qPc3RRVwlhPc@projproj.gehyr.mongodb.net/cookie?authSource=admin&replicaSet=atlas-pb8dcl-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
  ],
  providers: []
})
export class AppModule { }
