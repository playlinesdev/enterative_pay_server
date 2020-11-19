import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';

@Controller('transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService) { }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.transactionService.findById(id);
    }

    @Get('/reference/:id')
    getByReference(@Param('id') referenceId: String) {
        return this.transactionService.findByReference(referenceId);
    }

    @Get()
    getMany(@Query() query: { client?: String, referenceId?: String, id?: number, transactionId?: String, qrCode?: String, status?: Number }) {
        return this.transactionService.findAll(query);
    }

    @Post()
    createOne(@Body() body: { client: String, amount: number }) {
        return new Promise((res, rej) => {
            res(this.transactionService.createPurchase(body.client, body.amount));
        });
    }

}
