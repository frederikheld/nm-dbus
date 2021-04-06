'use strict'

const dbus = require('dbus-next')

class DBusObject {
    /**
     * @param {String} dbusType 
     * @param {Object} dbusConfig 
     */
    constructor (dbusType = 'session', dbusConfig = undefined) {
        this.dbusType = undefined
        if (dbusType === 'session') {
            this.dbusType = 'session'
            this.bus = dbus.sessionBus()
        } else if (dbusType === 'system') {
            this.dbusType = 'system'
            this.bus = dbus.systemBus()
        } else {
            throw new dbus.DBusError('Bus type "' + dbusType + '" not supported')
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
