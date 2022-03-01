import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { IsEmail, IsNotEmpty, IsInt, Min, IsEnum } from 'class-validator';

export class CreateGameDto {
    @IsEnum([.05 * LAMPORTS_PER_SOL, .1 * LAMPORTS_PER_SOL, .25 * LAMPORTS_PER_SOL, .5 * LAMPORTS_PER_SOL, 1 * LAMPORTS_PER_SOL, 2 * LAMPORTS_PER_SOL], { message: 'Allowed bets: 0.05, 0.1, 0.25, 0.5, 1 and 2 SOLs' })
    amount: number;

    @IsEnum([0, 1, 2], { message: 'Choice should be 0, 1, 2' })
    creatorMove: number;
}