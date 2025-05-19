import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
