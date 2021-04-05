'use strict'

/**
 * This error is being used if a network device is
 * being accessed but it can't be found.
 */
 class DeviceNotFoundError extends Error {
    constructor(message) {
        super(message)
    }
}


/**
 * This error is being used if the wireless interface of a
 * device is being called but the device has no wireless interface.
 */
class NoWirelessInterfaceError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports.DeviceNotFoundError = DeviceNotFoundError
module.exports.NoWirelessInterfaceError = NoWirelessInterfaceError