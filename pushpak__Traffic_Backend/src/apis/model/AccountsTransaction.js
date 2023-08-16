const { Model } = require('objection');

class AccountsTransaction extends Model {
    static get tableName() {
        return 'accounts__transactions';
    };
    static get idColumn() {
        return 'transaction_id';
    };
};

module.exports = AccountsTransaction;