import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { authConstants } from './auth-constants';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async hashPassword(password: String) {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
    }

    async validateUser(username: String, password: String) {
        var user = await this.usersService.findOne(username)
        var passEquals = await bcrypt.compare(password, user.password.toString())
        if (user && passEquals) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId }
        var serverTime = new Date()
        var expireServerTime: Date = Object.assign(serverTime)
        expireServerTime.setSeconds(expireServerTime.getSeconds() + jwtConstants.expiresIn)
        return {
            serverTime: serverTime,
            expireServerTime: expireServerTime,
            expiresInSeconds: jwtConstants.expiresIn,
            access_token: this.jwtService.sign(payload),
        }
    }
}
