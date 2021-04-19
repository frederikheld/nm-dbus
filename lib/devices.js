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
     * @returns {Array of Device} List of Device objects
     */
    async getAll () {

        // get all device paths:
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.baseName)
        const devicePaths = await managerInterface.GetDevices()

        // create device objects from those paths:
        const devices = []

        for (const devicePath of devicePaths) {
            const device = new Device(this.dbusType, { ...this.dbusConfig, devicePath: devicePath })
            await device.load(devicePath)
            devices.push(device)
        }

        return devices
    }

    /**
     * Returns a list of all devices that have a wireless interface.
     * 
     * @returns {Array of Device} List of Device objects
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

    /**
     * Returns the device with the given interface name (e.g. 'wlan0').
     * 
     * @param {String} interfaceName
     * @returns {Device}
     */
    async getByInterface(interfaceName) {

        // get all device paths:
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.baseName)
        const devicePath = await managerInterface.GetDeviceByIpIface(interfaceName)

        // create device object from device path:
        const device = new Device(this.dbusType, { ...this.dbusConfig, devicePath: devicePath })
        await device.load(devicePath)

        return device

    }

    async getByPath (devicePath) {

        // create device object from device path:
        const device = new Device(this.dbusType, { ...this.dbusConfig, devicePath: devicePath })
        await device.load(devicePath)

        return device

    }

    // async getByInterfaceName (interfaceName) {
    //     const list = await this.list()
    //     return list.find((item) => {
    //         item ===
    //     })
    // }

}

module.exports = Devices
