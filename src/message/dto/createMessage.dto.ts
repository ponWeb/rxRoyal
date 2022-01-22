import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { IsEmail, IsNotEmpty, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateMessageDto {
    @MaxLength(100, { message: 'Message can`t be longer than 100 characters' })
    @IsNotEmpty({ message: "Message can`t be empty" })
    content: string
}