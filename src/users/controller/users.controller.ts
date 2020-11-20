import { Body, ConflictException, Controller, Inject, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    createUser(@Body() user: UserEntity) {
        return new Promise(async (res, rej) => {
            await this.usersService.createOne(user).then((entities) => {
                res(entities)
            }).catch((err) => {
                throw new ConflictException()
            })
        })
    }
}
