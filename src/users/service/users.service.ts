import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) { }

    async findOne(username: String) {
        return await this.repository.findOne({ where: { username: username } })
    }

    async createOne(user: UserEntity) {
        var createdEntities = await this.repository.create([user]);
        return await this.repository.save(createdEntities).then((entities) => {
            return entities;
        })
    }
}
