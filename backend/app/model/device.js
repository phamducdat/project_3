const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/IoT', { useNewUrlParser: true, useUnifiedTopology: true });

const DeviceSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    embedId: String,
    deviceName: String,
    connectState: {
        type: String,
        enum: ["ON", "OFF"]
    },
    location: [],
    userId: String,
    stateHistory: [{
        at: {
            type: Date,
            default: Date.now()
        },
        temperature: Number,
        humidity: Number,
        co2: Number,
        dust: Number
    }]
})

DeviceSchema.statics = {
    createDevice: async function (data) {
        try {
            let device = new this({
                _id: new mongoose.Types.ObjectId,
                embedId:data.embedId,
                deviceName: data.deviceName,
                connectState: data.connectState,
                location: data.location,
                userId: data.userId,
                stateHistory: data.stateHistory,
            })
            await device.save();
            return device;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = mongoose.model('Device', DeviceSchema);