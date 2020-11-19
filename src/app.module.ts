import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { TransactionEntity } from './transaction/entities/transaction.entity';
import { TransactionModule } from './transaction/transaction.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 6033,
    // logging: true,
    entities: [TransactionEntity],
    autoLoadEntities: true,
    synchronize: true,
    database: 'enterative_pay',
    username: 'root',
    password: 'root'
  }), TransactionModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
