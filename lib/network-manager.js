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

const Connection = require('./connection')
const Device = require('./device')
const Devices = require('./devices')
const Wireless = require('./wireless')

class NetworkManager {
    constructor () {
        this.dbusName = 'org.freedesktop.NetworkManager'
        this.dbusPath = '/org/freedesktop/NetworkManager'
        this.dbusPropertiesName = 'org.freedesktop.DBus.Properties'

        this.bus = dbus.systemBus()

        // init sub-modules:
        this.devices = new Devices(this.bus, this.dbusConfig)

        // this.wireless = new Wireless()
    }

    get dbusConfig () {
        return {
            dbusName: this.dbusName,
            dbusPath: this.dbusPath,
            dbusPropertiesName: this.dbusPropertiesName
        }
    }

    // listDevices () {

    // }

    // listConnections () {

    // }

    // getDevice (ifname) {

    // }

    // getConnection (id) {

    // }

}

module.exports = NetworkManager

module.exports.NetworkManager = NetworkManager
module.exports.Device = Device
module.exports.Devices = Devices
module.exports.Connection = Connection
module.exports.Wireless = Wireless