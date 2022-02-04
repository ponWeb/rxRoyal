import { IsNotEmpty, MinLength } from 'class-validator';

export class EditUserDto {
    @MinLength(2, { message: 'Username should contain at least 2 characters' })
    username: string;
}
