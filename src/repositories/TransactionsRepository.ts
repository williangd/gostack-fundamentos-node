import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  type: TransactionType;
  value: number;
  title: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.value;
        } else {
          acc.outcome += t.value;
        }
        acc.total = acc.income - acc.outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
