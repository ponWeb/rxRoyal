import { TransactionService } from 'src/transaction/transaction.service';
export declare class TasksService {
    private transactionService;
    constructor(transactionService: TransactionService);
    checkDeposits(): Promise<void>;
}
