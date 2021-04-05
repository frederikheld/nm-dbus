'use strict'

/**
 * This package provides NetworkManager access for JavaScript.
 * It communicates with NetworkManager via DBus.
 * 
 * The structure of the package follows the strcuture of
 * the `nmcli` application.
 * 
 * Note that this package can only work on Linux installations
 * that use NetworkManager.
 * 
 * You can install NetworkManager via:
 * 
 *      $ sudo apt install network-manager
 */

const Device = require('./device')
const Connection = require('./connection')

class NetworkManager {

    constructor() {

    }

    hello() {
        console.log('Hello, this is NetworkManager!')
    }

    static Device() {
        return Device
    }

    static Connection() {
        return Conncetion
    }
}

module.exports = NetworkManager
module.exports.NetworkManager = NetworkManager
module.exports.Device = Device