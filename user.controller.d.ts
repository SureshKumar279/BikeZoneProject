import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(body: any): Promise<import("./user.entity").User>;
}
