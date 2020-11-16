import { Payment } from './payment';

export class Transaction {
  transactionId: String;
  referenceId: String;
  amount: number;
  description: String;
  dtTransaction: Date;
  payment: Payment;
  status: number;
}
