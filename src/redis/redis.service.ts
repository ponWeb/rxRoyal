import { Injectable, Logger } from '@nestjs/common';
import * as Redis from 'redis';

@Injectable()
export class RedisService {
    constructor() {
    }

    async createClient() {
        const redisClient = await Redis.createClient({ url: 'rediss://:p2827e34629b3900989294f032de66af342fbef61dd714724d4c98513a32e7a6b@ec2-34-231-246-40.compute-1.amazonaws.com:19680' })

        return redisClient
    }
}
