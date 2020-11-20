import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/service/users.service';
import { AuthService } from './auth.service';
import { LocalAuth } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService, LocalStrategy, AuthService, LocalAuth],
    // exports: [LocalAuth]
})
export class AuthModule { }
