import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionModule } from "src/transaction/transaction.module";
import { AssociatedKeypair, AssociatedKeypairSchema } from "./associatedKeypair.schema";
import { AssociatedKeypairService } from "./associatedKeypair.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: AssociatedKeypair.name, schema: AssociatedKeypairSchema }])],
    providers: [AssociatedKeypairService],
    exports: [AssociatedKeypairService]
})

export class AssociatedKeypairModule { }