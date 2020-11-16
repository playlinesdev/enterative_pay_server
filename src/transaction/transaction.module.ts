import { Module } from '@nestjs/common';
import { Payment } from './payment';
import { Transaction } from './transaction';
import { TransactionController } from './transaction.controller';

@Module({
  providers: [Transaction, Payment],
  controllers: [TransactionController],
})
export class TransactionModule {}
