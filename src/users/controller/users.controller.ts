import { Body, ConflictException, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

const errors = {
    '@@@': 'Erro desconhecido no servidor',
    'ER_DUP_ENTRY': 'Usuário já existente'
}
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
            if (errors[err.code]) {
                exception = new ConflictException({
                    message: errors[err.code]
                })
            } else {
                throw new ConflictException({
                    message: errors['@@@']
                })
            }

        })
        if (exception)
            throw exception
        if (savedUser) {
            const { password, ...result } = savedUser
            return result
        }
    }
}
