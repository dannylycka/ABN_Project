export interface account {
  groupName: string;
  groupId: string;
  accounts: [];
}

export interface accountInformation {
  accountNumberType: string;
  accountNumber: string;
  productName: string;
  currencyCode: string;
  holderName: string;
  bankCountryCode: string;
  bankIdentifierCode: string;
  balance: number;
}

export interface transactions {
  transactionId: string;
  bookDate: Date;
  transactionDateTime: Date;
  creditDebitIndicator: string;
  amount: number;
  counterpartyAccountNumber: string;
  counterpartyName: string;
  description: string;
}

export interface transactionInformation {
  accountNumber: string;
  currencyCode: string;
}
