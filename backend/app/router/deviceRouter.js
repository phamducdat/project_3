const express = require('express');
const deviceRouter = express.Router();

const deviceController = require('../controller/deviceController');
const auth = require("../middleware/auth")

deviceRouter.get("/", deviceController.getAllDevice)
deviceRouter.get("/:deviceId", deviceController.getDeviceByDeviceId)
deviceRouter.put("/:deviceId", deviceController.updateDeviceByDeviceId);
deviceRouter.post("/:deviceId", deviceController.updateStateHistoryByDeviceId);
deviceRouter.delete("/:deviceId", deviceController.deleteDeviceByDeviceId);



module.exports = deviceRouter;