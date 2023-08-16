const { Model } = require('objection');

class VehiclesTimeline extends Model {
    static get tableName() {
        return 'vehicles__timeline';
    };
    static get idColumn() {
        return 'timeline_id';
    };
};

module.exports = VehiclesTimeline;