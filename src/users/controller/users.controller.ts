import { Body, ConflictException, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post()
    async createUser(@Body() user: UserEntity) {
        var hash = await this.authService.hashPassword(user.password)
        user.password = hash
        var savedUser: UserEntity
        var exception
        await this.usersService.createOne(user).then((ent) => {
            savedUser = ent[0]
        }).catch((err) => {
            exception = new ConflictException()
        })
        if (exception)
            throw exception
        if (savedUser) {
            const { password, ...result } = savedUser
            return result
        }
    }
}
