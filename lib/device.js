'use strict'

const { DeviceNotFoundError, NoWirelessInterfaceError } = require('./errors')

class Device {
    construct() { }

    hello() {
        console.log('Hello, this is Device!')
    }

    list() {

    }
}

module.exports = Device