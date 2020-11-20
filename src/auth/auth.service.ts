import { Dependencies, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: String, password: String) {
        var user = await this.usersService.findOne(username)
        if (user && user.password == password) {
            const { password, ...result } = user
            return result
        }
        return null
    }
}
