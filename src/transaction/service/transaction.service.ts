import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { v1 as uuidv1, v1 } from 'uuid';
import axios from 'axios'

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
    async createPurchase(client: String, amount: number, description: String = '') {
        //creates it on internal database
        var t: TransactionEntity = {
            amount: amount,
            client: client,
            status: 0,
            referenceId: v1({ msecs: new Date().getTime() }),
            description: description ?? 'Crédito Enterative Pay',
            payment_pix_expirationDateTime: new Date(),
            payment_pix_key: 'RANDOM_KEY',
            payment_pix_provider: 'C6BANK',
            date_purchase: new Date()
        }
        var save = await this.transaction.save(t)

        var payGoResponse = await axios.post('https://apidemo.gate2all.com.br/v1/transactions/', {
            "referenceId": save.referenceId,
            "amount": save.amount,
            "description": save.description,
            "payment": {
                "pix": {
                    "provider": save.payment_pix_provider,
                    "key": [save.payment_pix_key],
                    "expirationDateTime": save.payment_pix_expirationDateTime.toISOString()
                }
            }
        }, {
            headers: {
                "authenticationApi": "demo",
                "authenticationKey": "A420C95AF486F0E64437"
            }
        }).catch((err) => {
            console.log(err);
            save.qrCode = v1({ msecs: new Date().getTime() })
            this.transaction.save(save);
        })

        console.log(save)
        return save
    }
}
