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
            const devicePropertiesInterface = deviceProxyObject.getInterface(this.dbusConfig.propertiesName)
            const deviceProperties = await devicePropertiesInterface.GetAll(this.dbusConfig.baseName + '.Device')

            // turn into object and add to list
            const deviceDBusConfig = this.dbusConfig
            deviceDBusConfig.devicePath = devicePath
            devices.push(new Device(deviceProperties, this.dbusType, deviceDBusConfig))
        }

        return devices
    }

    /**
     * Returns a list of all devices that have a wireless interface.
     * 
     * @returns {Array of Device} List of wireless Devices
     */
    async getWireless() {
        const devices = await this.getAll()

        const deviceIsWireless = await Promise.all(
            devices.map(async (device) => {
                return device.hasWirelessInterface()
            })
        )

        return devices.filter((device, i) => {
            if (deviceIsWireless[i]) {
                return device
            }
        })
    }

    // async getByPath (devicePath) {

    // }

    // async getByInterfaceName (interfaceName) {
    //     const list = await this.list()
    //     return list.find((item) => {
    //         item ===
    //     })
    // }

}

module.exports = Devices
