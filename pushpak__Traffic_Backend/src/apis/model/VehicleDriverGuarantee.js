const { Model } = require('objection');

class DriverGuarantee extends Model {
    static get tableName() {
        return 'vehicles__drivers_guarantee';
    };
    static get idColumn() {
        return 'guarantee_id';
    };
};

module.exports = DriverGuarantee;