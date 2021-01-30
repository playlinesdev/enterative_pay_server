import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { v1 } from 'uuid';
import axios from 'axios'

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(TransactionEntity) private readonly transaction: Repository<TransactionEntity>) { }
    async findById(id: string) {
        var trans = await this.transaction.findOne({ where: { referenceId: id } })
        var paygoTrans = await this.readPaygoTransaction(trans.transactionId);
        if (trans && (!trans.qrCode || trans.status != 6)) {
            return await this.updateTransactionByReference({ dbTransaction: trans, paygoTransaction: paygoTrans });
        }
        return trans
    }
    /**
     * Updates a transaction on internal database based on paygo transaction instance
     */
    async updateTransactionByReference(data: { referenceId?: String, dbTransaction?: TransactionEntity, paygoTransaction?: any }) {
        var { referenceId, dbTransaction, paygoTransaction } = data
        var dbTransaction = dbTransaction ?? await this.transaction.findOne({ where: { referenceId: referenceId } })
        var payGoTransaction = paygoTransaction ?? await this.readPaygoTransaction(dbTransaction.referenceId);
        if (payGoTransaction && this.dbTransactionDifferFromPaygo(dbTransaction, payGoTransaction)) {
            dbTransaction = this.updateDbTransctionWithPaygo(dbTransaction, payGoTransaction)
            return this.transaction.save(dbTransaction);
        }
        return false
    }
    updateDbTransctionWithPaygo(db: TransactionEntity, paygo) {
        db.status = paygo.status
        db.date_purchase = paygo.dtTransaction
        db.amount = paygo.amount
        db.qrCode = paygo.payment.pix.qrCode
        db.transactionId = paygo.transactionId
        return db
    }

    dbTransactionDifferFromPaygo(db: TransactionEntity, paygo) {
        return db.status != paygo.status ||
            db.transactionId != paygo.transactionId ||
            db.date_purchase != paygo.dtTransaction ||
            db.amount != paygo.amout
    }

    findAll(query: { client?: String, referenceId?: String, id?: number, transactionId?: String, qrCode?: String, status?: Number }) {
        return this.transaction.find({ where: query })
    }

    async readPaygoTransaction(transactionId: String) {
        try {
            var response = await axios.get('https://apidemo.gate2all.com.br/v1/transactions/' + transactionId, {
                headers: {
                    "authenticationApi": "chart.claudio",
                    "authenticationKey": "FD1C186AA04684FC6966"
                }
            })
            return response.data
        } catch (error) {
            throw error
        }
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

        var payGoResponse: any = await axios.post('https://apidemo.gate2all.com.br/v1/transactions/', {
            "referenceId": save.referenceId,
            "amount": save.amount,
            "description": save.description,
            "postBackUrl": "http://179.34.37.251:8080/transaction/updateFromPayGo",
            "payment": {
                "pix": {
                    "provider": save.payment_pix_provider,
                    "key": [save.payment_pix_key],
                    "expirationDateTime": save.payment_pix_expirationDateTime.toISOString()
                }
            }
        }, {
            headers: {
                "authenticationApi": "chart.claudio",
                "authenticationKey": "FD1C186AA04684FC6966"
            }
        }).catch((err) => {
            console.log(err);
            save.qrCode = v1({ msecs: new Date().getTime() })
            this.transaction.save(save);
        })

        this.updateTransactionByReference({ dbTransaction: save, paygoTransaction: payGoResponse.data })
        console.log(payGoResponse)
        console.log(save)
        return save
    }
}
