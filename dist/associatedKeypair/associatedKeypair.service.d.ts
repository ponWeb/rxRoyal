import { Model, ObjectId } from "mongoose";
import { AssociatedKeypairDocument } from "./associatedKeypair.schema";
export declare class AssociatedKeypairService {
    private associatedKeypairModel;
    constructor(associatedKeypairModel: Model<AssociatedKeypairDocument>);
    create(): Promise<ObjectId>;
    findById(_id: ObjectId, selectSecretKey?: boolean): Promise<AssociatedKeypairDocument>;
}
