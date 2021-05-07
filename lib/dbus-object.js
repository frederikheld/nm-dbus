'use strict'

const dbus = require('dbus-next')

class DBusObject {
    /**
     * Note: As opposed to previous versions the parameter `dbusType` will
     * not default to anything as it happened way to often, that a mistyped
     * varialbe (which resolves as undefined) caused NetworkManager
     * to default to session bus while system bus was required. This led
     * to very difficult debug errors. Derived classes however can default
     * this value but you need to take care of consistency yourself!
     * 
     * @param {String} dbusType 
     * @param {Object} dbusConfig 
     */
    constructor (dbusType, dbusConfig = undefined) {
        if (dbusType === undefined) {
            throw new TypeError('Parameter `dbusType` can\'t be undefined')
        }
        if (dbusType === 'session') {
            this.dbusType = 'session'
            this.bus = DBusSingletonFactory.getSessionBus()
        } else if (dbusType === 'system') {
            this.dbusType = 'system'
            this.bus = DBusSingletonFactory.getSystemBus()
        } else {
            throw new TypeError('Bus type \'' + dbusType + '\' not supported')
        }

        if (!dbusConfig) {
            this.dbusConfig = {
                propertiesName: 'org.freedesktop.DBus.Properties',
                baseName: 'org.freedesktop.NetworkManager',
                basePath: '/org/freedesktop/NetworkManager',
                name: 'org.freedesktop.NetworkManager',
                path: '/org/freedesktop/NetworkManager'
            }
        } else {
            this.dbusConfig = { ...dbusConfig }
            // Note: this needs to be an explicit copy, otherwise the object will be passed
            // by reference to all derived objects and any change in one of the children
            // will immediately affect all other children (as they all point to the same object).
        }

        /**
         * TODO: test constructor:
         * - allows bus type "system" and "session"
         * - defaults to "session"
         * 
         * TODO: do we even need to allow a session bus?
         * Is there any use case in which network-manager runs on the session bus?
         * Is this even possible?
         */
    }
}

/**
 * Opening dbus connections heavy-weight and the total number is limited.
 * Therefore the whole app should keep only one connection to each bus.
 * This factory makes sure that only one instance to each bus exists by
 * implementing the singleton pattern.
 */
class DBusSingletonFactory {
    constructor() { }

    static getSystemBus () {
        if (!DBusSingletonFactory.systemBusInstance) {
            DBusSingletonFactory.systemBusInstance = dbus.systemBus()
        }

        return DBusSingletonFactory.systemBusInstance
    }

    static getSessionBus () {
        if (!DBusSingletonFactory.sessionBusInstance) {
            DBusSingletonFactory.sessionBusInstance = dbus.systemBus()
        }

        return DBusSingletonFactory.sessionBusInstance
    }
}

module.exports = DBusObject
