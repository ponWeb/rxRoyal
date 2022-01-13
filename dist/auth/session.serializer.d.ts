import { PassportSerializer } from "@nestjs/passport";
import { ObjectId } from "mongoose";
import { UserDocument } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
export declare class SessionSerializer extends PassportSerializer {
    private userService;
    constructor(userService: UserService);
    serializeUser(user: UserDocument, done: Function): void;
    deserializeUser(userId: ObjectId, done: Function): Promise<void>;
}
