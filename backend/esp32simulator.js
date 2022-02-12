const fs = require('fs');
const readline = require('readline');
const mqtt = require('mqtt');
const mqttClient = mqtt.connect('tcp://broker.hivemq.com');
const publishTopic = "datpd/data";
const subscribeTopic = "datpd/+/command"

let devices = [];
let at = Date.now()
let co2 = 0;
let dust = 0;
let temperature = 0;
let humidity = 0;

class Device {
    constructor(embedId, location) {
        this.embedId = embedId;
        this.location = location;
        this.connectState = "ON";
    }
}

const rl = readline.createInterface({
    input: fs.createReadStream('device.txt'),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    let data = line.split(" ");
    devices.push(new Device(data[0], [data[1], data[2]]));
});

mqttClient.on('connect', () => {
    mqttClient.subscribe(subscribeTopic, (error) => {
        if (error) console.log(error);
    })
})

// const interval = setInterval(every5SecondsFunction, 5000);
const interval = setInterval(async () =>{
    await every15SecondsFunction()
},15000);

function fakeData() {
    temperature = (30 + 10 * Math.random()).toFixed(1);
    humidity = (100 * Math.random()).toFixed(1);
    at = Date.now();
    co2 = (30 + 10 * Math.random()).toFixed(1);
    dust = (30 + 10 * Math.random()).toFixed(1);
    console.log("We got the fake data")
}

async function every15SecondsFunction() {
    fakeData();
    devices.forEach(device => {
        mqttClient.publish(publishTopic, JSON.stringify(
            {
                embedId: device.embedId,
                connectState: device.connectState,
                location: device.location,
                at: at,
                temperature: temperature,
                humidity: humidity,
                co2:co2,
                dust:dust
            }
        ))
    })
}

mqttClient.on('message', (subscribeTopic, payload) => {
    try {
        let jsonMessage = JSON.parse(payload.toString());
        let embedId = subscribeTopic.split("/")[1];

        const index = devices.findIndex(device => device.embedId === embedId);
        devices[index].connectState = jsonMessage.connectState;
    } catch (error) {
        console.log(error)
    }

})
