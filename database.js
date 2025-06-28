class Database {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.save();
    }

    getTransactions() {
        return this.transactions;
    }

    save() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    clear() {
        this.transactions = [];
        this.save();
    }
}

const db = new Database();