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

const Wireless = require('./wireless')
const Device = require('./device')
const Connection = require('./connection')

class NetworkManager {

    // constructor(bus_type = 'session') {
    //     if (bus_type === 'session') {
    //         this.bus = dbus.sessionBus()
    //     } else if (bus_type === 'system') {
    //         this.bus = dbus.systemBus()
    //     } else {
    //         throw Error('Bus type not supported!')
    //     }
    // }

    constructor() {
        this.dbusName = 'org.freedesktop.NetworkManager'
        this.dbusPath = '/org/freedesktop/NetworkManager'
        this.dbusPropertiesName = 'org.freedesktop.DBus.Properties'

        this.bus = dbus.systemBus()

        this.wireless = new Wireless()
    }

    hello() {
        console.log('Hello, this is NetworkManager!')
    }

    listDevices () {

    }

    listConnections () {

    }

    getDevice (ifname) {

    }

    getConnection (id) {

    }
    

    // // Object factories:

    // static getDevice () {
    //     return new Device()
    // }

    // Sub-class access:

    static Device () {
        return Device
    }

    static Connection () {
        return Conncetion
    }
}

module.exports = NetworkManager

module.exports.NetworkManager = NetworkManager
module.exports.Wireless = Wireless
module.exports.Device = Device
module.exports.Connection = Connection