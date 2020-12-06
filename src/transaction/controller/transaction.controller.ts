import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService) { }

    /**
     * Searches for a transaction by it's reference id
     */
    @UseGuards(JwtAuthGuard)
    @Get('/reference/:referenceId')
    getOne(@Param('referenceId') id: string) {
        return this.transactionService.findById(id);
    }

    /**
     * 
     */
    @UseGuards(JwtAuthGuard)
    @Put('/reference/:id')
    getByReference(@Param('id') referenceId: String) {
        return this.transactionService.updateTransactionByReference(referenceId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getMany(@Query() query: { client?: String, referenceId?: String, id?: number, transactionId?: String, qrCode?: String, status?: Number }) {
        return this.transactionService.findAll(query);
    }

    @Post('updateFromPayGo')
    updateFromPayGo(@Body() payGoData: any) {
        console.log('Update chegando da PayGo')
        console.log(payGoData)
        return 'ok'
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createOne(@Body() body: { client: String, amount: number, description?: String }) {
        return new Promise(async (res, rej) => {
            var r = await this.transactionService.createPurchase(body.client, body.amount, body.description).catch((err) => {
                rej(err);
            });
            res(r)
        });
    }

}
