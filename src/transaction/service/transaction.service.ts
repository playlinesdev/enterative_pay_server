import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { v1 as uuidv1, v1 } from 'uuid';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(TransactionEntity) private readonly transaction: Repository<TransactionEntity>) { }
    findById(id: string) {
        return this.transaction.find({ where: { id: id } })
    }
    findByReference(referenceId: String) {
        return this.transaction.findOne({ where: { referenceId: referenceId } })
    }
    findAll(query: { client?: String, referenceId?: String, id?: number, transactionId?: String, qrCode?: String, status?: Number }) {
        return this.transaction.find({ where: query })
    }
    createPurchase(client: String, amount: number) {
        //creates it on internal database
        var t: TransactionEntity = { amount: amount, client: client, status: 0, referenceId: v1({ msecs: new Date().getTime() }) }
        this.transaction.save(t)
        console.log(t)
    }
}
