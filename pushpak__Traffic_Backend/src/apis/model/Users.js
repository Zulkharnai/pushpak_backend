const { Model } = require('objection');

class DriverGuarantee extends Model {
    static get tableName() {
        return 'users';
    };
    static get idColumn() {
        return 'user_id';
    };
};

module.exports = DriverGuarantee;