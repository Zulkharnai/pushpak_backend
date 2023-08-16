const { Model } = require('objection');

class AccountsLeadgers extends Model {
    static get tableName() {
        return 'accounts__ledgers';
    };
    static get idColumn() {
        return 'ledger_id';
    };
};

module.exports = AccountsLeadgers;