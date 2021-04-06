'use strict'

const DBusObject = require('./dbus-object')
const Device = require('./device')

class Devices extends DBusObject {
    constructor (dbusType, dbusConfig) {
        super(dbusType, dbusConfig)
    }

    /**
     * Returns a list of all available network devices.
     * 
     * @returns 
     */
    async getAll () {

        // get device paths:
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.baseName)
        const devicePaths = await managerInterface.GetDevices()

        // get devices to those paths:
        const devices = []

        for (const devicePath of devicePaths) {
            const deviceProxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, devicePath)
            const deviceProertiesInterface = deviceProxyObject.getInterface(this.dbusConfig.propertiesName)
            const deviceProperties = await deviceProertiesInterface.GetAll(this.dbusConfig.baseName + '.Device')

            // turn into object and add to list
            const deviceDBusConfig = this.dbusConfig
            deviceDBusConfig.devicePath = devicePath
            devices.push(new Device(deviceProperties, this.dbusType, deviceDBusConfig))
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
