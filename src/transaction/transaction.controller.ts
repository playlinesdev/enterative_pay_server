import { Controller, Get } from '@nestjs/common';
import { Transaction } from './transaction';

@Controller('transaction')
export class TransactionController {
  @Get()
  listTransaction(): Promise<Transaction[]> {
    return new Promise((res, rej) => {
      res();
    });
  }
}
