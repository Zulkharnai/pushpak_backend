const { Model } = require('objection');

class DriverProfile extends Model {
    static get tableName() {
        return 'vehicles__drivers_profile';
    };
    static get idColumn() {
        return 'driver_id';
    };
};

module.exports = DriverProfile;