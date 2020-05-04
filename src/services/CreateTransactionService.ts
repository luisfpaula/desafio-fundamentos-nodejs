import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;  
  type: "income" | "outcome";
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value } : Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    //Valida o tipo da transação e calculos para o balanço
    switch(type){
      case "income": {        
        break;
      }
      case "outcome": {  
        if(balance.total < value){
          throw Error('You do not enough balance!');
        }
        break;
      }
      default: {
        throw Error('This type of transaction is invalid!');
        break;
      }
    }
    
    const transaction = this.transactionsRepository.create({ title, value, type });
    
    return transaction;
  }
}

export default CreateTransactionService;
