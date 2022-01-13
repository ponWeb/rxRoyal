import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { IsEmail, IsNotEmpty, IsInt, Min, IsEnum } from 'class-validator';

export class CreateGameDto {
    @IsInt({ message: 'Amount should be integer' })
    @Min(.05 * LAMPORTS_PER_SOL, { message: 'Minimum bet is 0.05 SOLs' })
    amount: number;

    @IsEnum([0, 1], { message: 'Choice should be 0 or 1' })
    creatorChoice: number;
}