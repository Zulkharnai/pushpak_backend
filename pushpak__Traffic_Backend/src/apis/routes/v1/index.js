const express = require('express');
const { getvehicle, vehicleDetails, GetActivity, GetATM, GetBPCL, GetCash, DashboardHeader, MejorIssueVehicle } = require('@controllers/TrafficDashboard');
const router = express.Router();

router.get('/Vehicle', getvehicle);
router.get('/VehicleDetails', vehicleDetails);
router.get('/GetActivity', GetActivity);
router.get('/GetATM', GetATM);
router.get('/GetBPCL', GetBPCL);
router.get('/GetCash', GetCash);
router.get('/DashboardHeader', DashboardHeader);
router.post('/MejorIssueVehicle', MejorIssueVehicle);

module.exports = router;