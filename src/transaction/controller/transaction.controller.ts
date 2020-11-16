import { Controller, Get, Post } from '@nestjs/common';
import { Transaction } from '../entities/transaction';

@Controller('transaction')
export class TransactionController {
  @Post()
  createTransaction(): Promise<Transaction> {
    return new Promise((res, rej) => {
      res(null);
    });
  }

  @Get()
  listTransaction(): Promise<Transaction[]> {
    return new Promise((res, rej) => {
      res([
        {
          amount: 100,
          description: 'Uma transação',
          dtTransaction: new Date(),
          referenceId: '123',
          status: 0,
          transactionId: null,
          payment: {
            pix: {
              expirationDateTime: new Date(),
              key: '123123',
              paymentAmount: 100,
              provider: 'C6BANK',
              qrCode: '1lkjaçlsdkf',
              payer: {
                document: '123123',
                name: 'Juscelino Batista',
                provider: 'C6BANK',
              },
            },
          },
        },
      ]);
    });
  }
}
