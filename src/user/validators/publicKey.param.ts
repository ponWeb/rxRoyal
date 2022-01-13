import { IsNotEmpty } from 'class-validator';

export class PublicKeyParam {
    @IsNotEmpty()
    publicKey: string;
}
