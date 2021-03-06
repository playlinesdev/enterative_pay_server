import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("transaction")
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    referenceId: String
    @Column({ default: '', nullable: true })
    transactionId?: String
    @Column({ type: 'decimal', scale: 2, precision: 11 })
    amount: number
    @Column({ type: 'int' })
    status: number
    @Column()
    client: String
    @Column({ length: 1024, default: '' })
    qrCode?: String
    @Column({ default: '' })
    description: String
    @Column({ default: '' })
    payment_pix_provider: String
    @Column({ default: '' })
    payment_pix_key: String
    @CreateDateColumn({ nullable: true })
    payment_pix_expirationDateTime: Date
    @CreateDateColumn({ nullable: false })
    date_purchase: Date
}
