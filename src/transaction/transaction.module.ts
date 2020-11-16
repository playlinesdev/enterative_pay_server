import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transaction.controller';
import { Payment } from './entities/payment';
import { Transaction } from './entities/transaction';
import { TransactionService } from './service/transaction.service';

@Module({
  providers: [Transaction, Payment, TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
