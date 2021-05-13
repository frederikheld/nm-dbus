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

    /**
     * Deactivates the given connection.
     * 
     * This will not prevent the device from auto-connecting with another connection!
     * If more connetions are configured and if autoconnect is not explicitly set to false,
     * another connection will automatically become active right after this function was called.
     * 
     * If you want to prevent the device from connecting with another connection,
     * use Device.disconnect() instead!
     * 
     * See: https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.html#gdbus-method-org-freedesktop-NetworkManager.DeactivateConnection
     * 
     * @param {String} activeConnectionPath 
     */
    async deactivateConnection(activeConnectionPath) {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const managerInterface = await proxyObject.getInterface(this.dbusConfig.baseName)

        await managerInterface.DeactivateConnection(activeConnectionPath)

    }

    /**
     * You have to call this function explicitly when you're done using NetworkManager
     * in order to disconnect from the dbus connection.
     * If you don't disconnect from the dbus connection, your program won't terminate!
     * 
     * Please note: if you run disconnect() right after instantiating the NetworkManager object,
     * the call will most likely fail because the dbus interface to which the constructor is
     * connecting to is not connected yet (so it can't be disconnected from).
     * This is a bug in `dbus-next`.
     * See: https://github.com/dbusjs/node-dbus-next/issues/69#issuecomment-814220961
     */
    async disconnect() {
        await this.bus.disconnect()
    }

}

module.exports = NetworkManager

module.exports.NetworkManager = NetworkManager
module.exports.Connection = Connection
module.exports.Connections = Connections
module.exports.Device = Device
module.exports.Devices = Devices
module.exports.Wireless = Wireless
