'use strict'

const NetworkManager = require('./lib/network-manager')
const Wireless = require('./lib/wireless')
const Device = require('./lib/device')
const Connection = require('./lib/connection')

/**
 * SYLE A
 * 
 * Usage:
 * 
 * const NetworkManager = require('NetworkManager')
 * 
 * const networkManager = new NetworkManager()
 * const device = new NetworkManager.Device()
 */
module.exports = NetworkManager


/**
 * SYLE B
 * 
 * Usage:
 * 
 * const { NetworkManager, Device } = require('NetworkManager')
 * 
 * const networkManager = new NetworkManager()
 * const device = new Device()
 */
module.exports.NetworkManager = NetworkManager
module.exports.Wireless = Wireless
module.exports.Device = Device
module.exports.Connection = Connection