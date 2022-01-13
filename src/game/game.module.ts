import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { GameController } from "./game.controller";
import { GameGateway } from "./game.gateway";
import { Game, GameSchema } from "./game.schema";
import { GameService } from "./game.serivce";

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
    controllers: [GameController],
    providers: [GameService, GameGateway]
})

export class GameModule { }