const Vehicle = require('@models/Vehicle');
const Activities = require('@models/Activities');
const AccountsVoucher = require('@models/AccountsVouchers');
const ResponseHandler = require('@common/libs/ResponseHandler');
const INTERNAL_SERVER_ERROR = require("@common/error/INTERNAL_SERVER_ERROR.JS");

const joi = require("joi");


const getvehicle = async (req, res) => {
    try {
        console.log(INTERNAL_SERVER_ERROR);
        let response = await Vehicle.getvehicle();
        ResponseHandler.success(req, res, response);
    } catch (error) {
        ResponseHandler.error(req, res, INTERNAL_SERVER_ERROR.super)
    }
}

const vehicleDetails = async (req, res) => {
    try {
        let vehicle_id = req.query.vehicle_id;
        const response = await Vehicle.vehicleDetails(vehicle_id);
        ResponseHandler.success(req, res, response);
    } catch (error) {
        throw error;
    }
}

const GetActivity = async (req, res) => {
    try {
        let vehicle_id = req.query.vehicle_id;
        let keyword = req.query.keyword;
        let from_date = req.query.from_date;
        let to_date = req.query.to_date;

        //validation
        if (!vehicle_id) {
            var obj = {
                code: 'INVALID_FORMATE',
                status: 403,
                message: 'Please Enter Vehicle ID'
            }
            ResponseHandler.error(req, res, obj)
        }


        let data = await Activities.activities(vehicle_id, keyword, from_date, to_date);
        ResponseHandler.success(req, res, data);
    } catch (error) {
        throw error;
    }
}

const GetATM = async (req, res) => {
    let vehicle_id = req.query.vehicle_id;
    let keyword = req.query.keyword;
    let from_date = req.query.from_date;
    let to_date = req.query.to_date;
    //pagination data
    var limit = Number(req.query.limit);
    var page = Number(req.query.page);
    var start = (page - 1) * limit;

    try {

        if (!vehicle_id) {
            var obj = {
                code: 'INVALID_FORMATE',
                status: 403,
                message: 'Please Enter Vehicle ID'
            }
            ResponseHandler.error(req, res, obj)
        }
        var response = await AccountsVoucher.GetATM(vehicle_id, start, limit, keyword, from_date, to_date)

        let total = response.total
        let total_pages = Math.ceil(total / limit);
        var next = page >= total_pages ? false : true;
        var prev = page <= 1 ? false : true;

        ResponseHandler.recordresponse(req, res, response.results, total, total_pages, next, prev);
    } catch (error) {
        ResponseHandler.error(req, res, error);
    }
}

const GetBPCL = async (req, res) => {
    let vehicle_id = req.query.vehicle_id;
    let keyword = req.query.keyword;
    let from_date = req.query.from_date;
    let to_date = req.query.to_date;

    var limit = Number(req.query.limit);
    var page = Number(req.query.page);
    var start = (page - 1) * limit;
    try {

        if (!vehicle_id) {
            var obj = {
                code: 'INVALID_FORMATE',
                status: 403,
                message: 'Please Enter Vehicle ID'
            }
            ResponseHandler.error(req, res, obj)
        }

        var response = await AccountsVoucher.GetBPCL(vehicle_id, start, limit, keyword, from_date, to_date)

        let total = response.total
        let total_pages = Math.ceil(total / limit);
        var next = page >= total_pages ? false : true;
        var prev = page <= 1 ? false : true

        ResponseHandler.recordresponse(req, res, response.results, total, total_pages, next, prev);

    } catch (error) {
        throw error
    }
}

const GetCash = async (req, res) => {
    let vehicle_id = req.query.vehicle_id;
    let keyword = req.query.keyword;
    let from_date = req.query.from_date;
    let to_date = req.query.to_date;

    var limit = Number(req.query.limit);
    var page = Number(req.query.page);
    var start = (page - 1) * limit;
    try {

        if (!vehicle_id) {
            var obj = {
                code: 'INVALID_FORMATE',
                status: 403,
                message: 'Please Enter Vehicle ID'
            }
            ResponseHandler.error(req, res, obj)
        }

        var response = await AccountsVoucher.GetCash(vehicle_id, start, limit, keyword, from_date, to_date);
        let total = response.total
        let total_pages = Math.ceil(total / limit);
        var next = page >= total_pages ? false : true;
        var prev = page <= 1 ? false : true

        ResponseHandler.recordresponse(req, res, response.results, total, total_pages, next, prev);

    } catch (error) {
        throw error
    }


}

const DashboardHeader = async (req, res) => {
    try {
        let response = await Activities.DashboardHeader();
        ResponseHandler.success(req, res, response);
    } catch (error) {
        throw error;
    }
}

const MejorIssueVehicle = async (req, res) => {
    var remark = req.body.remark;
    var vehicle_id = req.body.vehicle_id;
    var date = req.body.date;
    var entry_by = req.body.entry_by;

    var schema = joi.object({
        remark: joi.string().required(),
        entry_by: joi.number().required(),
        vehicle_id: joi.number().required(),
        date: joi.string().required(),
    });
    var validate = schema.validate({
        remark: remark,
        entry_by: entry_by,
        vehicle_id: vehicle_id,
        date: date,
    });

    if (typeof validate.error !== "undefined") {
        var obj = {
            code: 'INVALID_FORMATE',
            status: 403,
            message: validate.error.details[0].message
        }
        ResponseHandler.error(req, res, obj);
    }
    try {
        let response = await Vehicle.MejorIssueVehicle(vehicle_id, date, entry_by, remark);

        if (response.success == false) {
            var obj = {
                code: 'INVALID_FORMATE',
                status: 403,
                message: response.message
            }
            ResponseHandler.error(req, res, obj);
        } else {
            ResponseHandler.success(req, res, response);
        }
    } catch (error) {
        throw error
    }
}

const VehicleStatus = async (req, res) => {
    var activities_status = req.body.activities_status;
    var remark = req.body.remark || "";
    var activity_id = req.body.activities_id;
    if (!activities_status) {
        var obj = {
            code: 'INVALID_FORMATE',
            status: 403,
            message: "Please Enter Status"
        }
        ResponseHandler.error(req, res, obj);
    }

    if (!activity_id) {
        var obj = {
            code: 'INVALID_FORMATE',
            status: 403,
            message: "Please Select activity"
        }
        ResponseHandler.error(req, res, obj);
    }

    try {
        let response = await Activities.VehicleStatus(activity_id, activities_status, remark);

        ResponseHandler.success(req, res, response);
    } catch (error) {
        throw error
    }

}
module.exports = { getvehicle, vehicleDetails, GetActivity, GetATM, GetCash, GetBPCL, DashboardHeader, MejorIssueVehicle }