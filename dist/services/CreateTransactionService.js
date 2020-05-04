"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        var balance = this.transactionsRepository.getBalance();
        //Valida o tipo da transação e calculos para o balanço
        switch (type) {
            case "income": {
                break;
            }
            case "outcome": {
                if (balance.total < value) {
                    throw Error('You do not enough balance!');
                }
                break;
            }
            default: {
                throw Error('This type of transaction is invalid!');
                break;
            }
        }
        var transaction = this.transactionsRepository.create({ title: title, value: value, type: type });
        return transaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
