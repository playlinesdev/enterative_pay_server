import { Body, ConflictException, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    async createUser(@Body() user: UserEntity) {
        var entities
        await this.usersService.createOne(user).then((ents) => {
            entities = ents
        }).catch((err) => { })
        if (entities)
            return entities
        throw new ConflictException()
    }
}
