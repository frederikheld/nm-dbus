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
            this.bus = dbus.sessionBus()
        } else if (dbusType === 'system') {
            this.dbusType = 'system'
            this.bus = dbus.systemBus()
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
         * - default to "session"
         */
    }
}

module.exports = DBusObject
