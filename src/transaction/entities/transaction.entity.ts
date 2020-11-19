import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("transaction")
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    referenceId: String
    @Column()
    transactionId?: String
    @Column({ type: 'decimal' })
    amount: number
    @Column({ type: 'int' })
    status: number
    @Column()
    client: String
}