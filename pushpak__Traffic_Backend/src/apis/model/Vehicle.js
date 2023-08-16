const { Model } = require('objection');
const DriverProfile = require('@models/DriverProfile');
const Activity = require('@models/activities');
const VehiclesTimeline = require('@models/VehiclesTimeline');

class Vehicle extends Model {
    static get tableName() {
        return 'vehicles';
    };
    static get idColumn() {
        return 'vehicle_id';
    };

    static async getvehicle(start, limit, page) {
        if (start || limit) {
            var data = await Vehicle.query().page(start, limit);
        } else {
            var data = await Vehicle.query();
        }
        return data;
    }

    static async vehicleDetails(vehicle_id) {

        let vehicle = await Vehicle.query().findById(vehicle_id);

        let driver_data = await DriverProfile
            .query()
            .select('vehicles__drivers_guarantee.*', 'vehicles__drivers_profile.driver_id', 'vehicles__drivers_profile.driver_name', 'vehicles__drivers_profile.driver_mobile_number', 'vehicles__drivers_profile.driver_photo')
            .leftJoin('vehicles__drivers_guarantee', 'vehicles__drivers_guarantee.driver_id', 'vehicles__drivers_profile.driver_id')
            .where('vehicles__drivers_profile.driver_id', vehicle.driver_id);

        let activity = await Activity
            .query()
            .leftJoin('accounts__ledgers', 'accounts__ledgers.ledger_id', 'activities.ledger_id')
            .where('vehicle_id', vehicle.vehicle_id)
            .orderBy('activity_id', 'desc')
            .limit(1)
            .first()

        let res = { ...vehicle, driver_data, activity }

        return res;
    }

    static async MejorIssueVehicle(vehicle_id, date, entry_by, remark) {

        let vehicle = await Vehicle.query().findById(vehicle_id);
        let vehicle_status = await Vehicle.query().where('vehicle_status', '2').findById(vehicle_id);

        if (vehicle_status) {
            return ({ success: false, message: "Please check Vehicle Already in mejor issue!" });
        }

        if (!vehicle) {
            return ({ success: false, message: "Please check Vehicle not found!" });
        }

        const response = await VehiclesTimeline.query().insert({
            vehicle_id: vehicle_id,
            timeline: remark,
            timeline_date: date,
            entry_by: entry_by,
        });

        const result = await Vehicle.query()
            .findById(vehicle_id)
            .update({
                vehicle_status: 2,
            })

        return response;
    }
};

module.exports = Vehicle;