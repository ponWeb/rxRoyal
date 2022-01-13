import { Module } from '@nestjs/common';
import * as Redis from 'redis';
import { RedisService } from './redis.service';

@Module({
    providers: [RedisService],
})
export class RedisModule { }