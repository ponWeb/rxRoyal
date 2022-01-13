import { IsNotEmpty } from 'class-validator'
import { Type, Transform } from 'class-transformer';
import { Types } from "mongoose"

export class GameIdBody {
    @IsNotEmpty()
    @Type(() => Types.ObjectId)
    gameId: Types.ObjectId;
}
