export class Payment {
  pix: {
    provider: string;
    key: string;
    expirationDateTime: Date;
    paymentAmount: number;
    qrCode: String;
    payer: {
      name: String;
      document: String;
      provider: String;
    };
  };
}
