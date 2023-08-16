const { Model, raw } = require('objection');
const Vehicle = require('@models/Vehicle');


class Activities extends Model {
    static get tableName() {
        return 'activities';
    };
    static get idColumn() {
        return 'activity_id';
    };

    // Traffic Dashboard 
    static async activities(vehicle_id, keyword = null, from_date = null, to_date = null) {
        let query = Activities.query()
            .select('activities.*', 'users.*')
            .leftJoin('users', 'activities.entry_by', 'users.user_id')
            .where('vehicle_id', vehicle_id)

        if (keyword) {
            query = query.where('activities.lr_number', 'LIKE', `${keyword}`);
        }

        if (from_date && to_date) {
            query = query.whereBetween('activity_date', [from_date, to_date]);
        }
        query = query.orderBy('activity_id', 'desc')
        let data = await query

        return data;
    }

    static async DashboardHeader() {
        let late_delivery = await Activities
            .query()
            .select(raw('COUNT(expected_date) AS late_delivery'))
            .where('activity_status', 2)
            .where('expected_date', '>', raw('CURRENT_DATE'));

        let late_loaded = await Activities
            .query()
            .select(raw('COUNT(lr_number) AS late_loaded'))
            .where('lr_number', '!=', '')
            .where('activity_status', 1)
            .where('expected_date', '<', raw('CURRENT_DATE'));

        let pending_lr = await Activities.query()
            .select(raw('COUNT(lr_number) AS pending_lr'))
            .where('lr_number', '');

        let without_driver = await Vehicle.query()
            .select(raw('COUNT(driver_id) AS without_driver'))
            .where('driver_id', 0);

        let maintanance = await Vehicle
            .query()
            .select(raw('COUNT(vehicle_id) AS maintenance'))
            .where('vehicle_status', 1);

        let mejor = await Vehicle
            .query()
            .select(raw('COUNT(vehicle_id) AS major_issue'))
            .where('vehicle_status', 2);

        late_delivery[0].late_loaded = late_loaded[0].late_loaded
        late_delivery[0].pending_lr = pending_lr[0].pending_lr
        late_delivery[0].without_driver = without_driver[0].without_driver
        late_delivery[0].maintanance = maintanance[0].maintenance
        late_delivery[0].major_issue = mejor[0].major_issue
        return late_delivery;
    }

    static async VehicleStatus(activity_id, activities_status, remark) {
        let result = await Activity.query()
            .findById(activity_id)
            .update({
                remark: remark,
                activity_status: activities_status,
            });

        return result;
    }

    static async TrafficReport(){
        
    }
};

module.exports = Activities;