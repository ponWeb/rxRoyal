
import { Injectable, Logger } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class TasksService {
    constructor(private transactionService: TransactionService) { }

    async checkDeposits() {
        const unConfirmedTransactions = await this.transactionService.getUnconfirmed()

        Logger.log(`Unconfirmed transactions: ${unConfirmedTransactions.length}`)

        if (unConfirmedTransactions.length > 0) await this.transactionService.confirmMany(unConfirmedTransactions)
    }
}