const Device = require('../model/device');
const User = require('../model/user')
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

function validatorForValidId(req, res) {
    try {
        mongoose.Types.ObjectId(req);
    } catch (e) {
        res.status(404).send({
            error: "id must be single String of 12 bytes or a string of 24 hex characters"
        })
    }
}

module.exports = {
    getAllDevice: async (req, res) => {
        try {
            let devices = await Device.find();
            res.send({devices});
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

    getDeviceByDeviceId: async (req, res) => {
        try {
            validatorForValidId(req.params.deviceId, res);
            const deviceId = req.params.deviceId;
            let device = await Device.findById(deviceId);
            if (!device) {
                res.status(404).send({error: "Device not found"})
            } else {
                res.status(200).send({device})
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

    createDeviceByUserId: async (req, res) => {
        validatorForValidId(req.params.userId, res);
        validatorForValidId(req.body._id, res)
        try {
            let user = await User.findById(req.params.userId);
            if (!user) {
                res.send({
                    error: "User doesn't exist!"
                })
            } else {
                let device = await Device.createDevice(req.body);
                if (!device) {
                    res.status(404).send({error: "Device not found"})
                }
                device.userId = req.params.userId;
                await device.save();
                res.send({device})

            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },
    updateDeviceByDeviceId: async (req, res) => {
        validatorForValidId(req.params.deviceId, res);
        try {
            const deviceId = req.params.deviceId;
            await Device.findByIdAndUpdate(deviceId, req.body)
            let device = await Device.findById(deviceId);
            if (device) {
                res.status(200).send({device})
            }else {
                res.status(404).send({error: "Device not found"})
            }

        } catch (e) {
            res.status(500).send({
                error: "Internal Server Error"
            })
        }
    },
    updateStateHistoryByDeviceId: async (req, res) => {
        validatorForValidId(req.params.deviceId, res);
        const device = await Device.findById(req.params.deviceId);
        if (device) {
            device.stateHistory.push({
                at: req.body.at,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                co2: req.body.co2,
                dust: req.body.dust,
            })
            await device.save();
            res.status(200).send({device})
        }else {
            res.status(404).send({error: "Device not found"})
        }

    },
    deleteDeviceByDeviceId: async (req, res) => {
        try {
            validatorForValidId(req.params.deviceId, res)
            await Device.findByIdAndDelete(req.params.deviceId);
            res.status(204).send({})
        } catch (e) {
            res.status(500).send({
                error: "Internal Server Error"
            })
        }
    }
}