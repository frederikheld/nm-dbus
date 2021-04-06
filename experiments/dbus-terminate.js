// 'use strict'

/**
 * For some reason dbus  won't let the script terminate.
 * 
 * This experiment is to figure out how to terminate it properly.
 */

const dbus = require('dbus-next')

const bus = dbus.systemBus()

console.log('bus is an instance of', bus.constructor)

setTimeout(() => {
    bus.disconnect()
}, 1000)
// this is what the author of the package proposes
// source: https://github.com/dbusjs/node-dbus-next/issues/69

// bus._connection.stream.end()
// this is what bus.disconnect() does

