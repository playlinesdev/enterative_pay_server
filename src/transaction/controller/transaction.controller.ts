import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.transactionService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/reference/:id')
    getByReference(@Param('id') referenceId: String) {
        return this.transactionService.findByReference(referenceId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getMany(@Query() query: { client?: String, referenceId?: String, id?: number, transactionId?: String, qrCode?: String, status?: Number }) {
        return this.transactionService.findAll(query);
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
