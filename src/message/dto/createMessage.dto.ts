import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { IsEmail, IsNotEmpty, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateMessageDto {
    @MinLength(3, { message: 'Message has to be at least 3 characters' })
    @MaxLength(100, { message: 'Message can`t be longer than 100 characters' })
    content: string
}