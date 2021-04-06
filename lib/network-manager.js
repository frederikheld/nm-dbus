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

const dbus = require('dbus-next')

const DBusObject = require('./dbus-object')

const Connection = require('./connection')
const Device = require('./device')
const Devices = require('./devices')
const Wireless = require('./wireless')

class NetworkManager extends DBusObject {
    /**
     * @param {String} dbusType 
     * @param {Object} dbusConfig 
     */
    constructor (dbusType = 'session', dbusConfig = undefined) {
        super(dbusType, dbusConfig)
       
        // init sub-modules:
        this.devices = new Devices(this.dbusType, this.dbusConfig)
        this.wireless = new Wireless(this.dbusType, this.dbusConfig)
    }

    // TEST: Would this be the better API?
    async getDevices() {
        await this.devices.getAll()
    }

}

module.exports = NetworkManager

module.exports.NetworkManager = NetworkManager
module.exports.Device = Device
module.exports.Devices = Devices
module.exports.Connection = Connection
module.exports.Wireless = Wireless
