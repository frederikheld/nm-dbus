'use strict'

const Device = require('./device')

class Devices {
    constructor (bus, dbusConfig) {
        this.bus = bus
        
        this.dbusName = dbusConfig.dbusName
        this.dbusPath = dbusConfig.dbusPath
        this.dbusPropertiesName = dbusConfig.dbusPropertiesName
    }

    /**
     * Returns a list of all available network devices.
     * 
     * @returns 
     */
    async list () {
        // get device paths:
        const proxyObject = await this.bus.getProxyObject(this.dbusName, this.dbusPath)
        const managerInterface = proxyObject.getInterface(this.dbusName)
        
        const devicePaths = await managerInterface.GetDevices()

        // get devices to those paths:
        const devices = []

        for (const devicePath of devicePaths) {
            const deviceProxyObject = await this.bus.getProxyObject(this.dbusName, devicePath)
            const deviceProertiesInterface = deviceProxyObject.getInterface(this.dbusPropertiesName)
            const deviceProperties = await deviceProertiesInterface.GetAll(this.dbusName + '.Device')

            // turn into object and add to list
            devices.push(new Device(deviceProperties))
        }

        return devices
    }

    // async get (deviceName) {
    //     const list = await this.list()
    //     return list.find((item) => {
    //         item ===
    //     })
    // }
}

module.exports = Devices