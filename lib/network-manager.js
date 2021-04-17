'use strict'

/**
 * This package provides NetworkManager access for JavaScript.
 * It communicates with NetworkManager via DBus.
 * 
 * The structure of the package follows the strcuture of
 * the `nmcli` application.
 * 
 * Note that this package can only work on Linux systems
 * that use NetworkManager.
 * 
 * You can install NetworkManager via:
 * 
 *      $ sudo apt install network-manager
 */

// const dbus = require('dbus-next')

const DBusObject = require('./dbus-object')

const Connection = require('./connection')
const Connections = require('./connections')
const Device = require('./device')
const Devices = require('./devices')
const Wireless = require('./wireless')
const AccessPoint = require('./access-point')

class NetworkManager extends DBusObject {
    /**
     * @param {String} dbusType 
     * @param {Object} dbusConfig 
     */
    constructor (dbusType = 'system', dbusConfig = undefined) {
        super(dbusType, dbusConfig)
       
        // init sub-modules:
        this.connections = new Connections(this.dbusType, this.dbusConfig)
        this.devices = new Devices(this.dbusType, this.dbusConfig)
        this.wireless = new Wireless(this.dbusType, this.dbusConfig)
    }

    /**
     * This method tries to activate the given connection on the given device.
     * 
     * If the connection can't be activated on the device, the method will
     * throw an error.
     * 
     * Parameter accessPointObject is optional and only needed if connecting
     * to an access point. 
     * 
     * @param {Device} deviceObject
     * @param {Connection} connectionObject
     * @param {AccessPoint} accessPointObject
     * @returns {String} Active connection path
     */
    async activateConnection(connectionObject, deviceObject, accessPointObject = undefined) {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const managerInterface = await proxyObject.getInterface(this.dbusConfig.baseName)

        const activeConnectionPath = await managerInterface.ActivateConnection(
            connectionObject.connectionPath,
            deviceObject.devicePath,
            accessPointObject ? accessPointObject.accessPointPath : '/'
        )

        return activeConnectionPath
    }

}

module.exports = NetworkManager

module.exports.NetworkManager = NetworkManager
module.exports.Connection = Connection
module.exports.Connections = Connections
module.exports.Device = Device
module.exports.Devices = Devices
module.exports.Wireless = Wireless
