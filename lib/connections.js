'use strict'

const dbus = require('dbus-next')

const DBusObject = require('./dbus-object')
const Connection = require('./connection')

const objectDeepMerge = require('./utils/object-deep-merge')

const dbusSettingsVariantTypes = require('./types/dbus-settings-variant-types')

class Connections extends DBusObject {
    constructor (dbusType, dbusConfig) {
        super(dbusType, dbusConfig)

        // console.log('Connections dbusConfig before:', dbusConfig)
        
        // this.dbusConfig.name += '.Settings'
        // this.dbusConfig.path += '/Settings'
        this.dbusConfig.name = this.dbusConfig.baseName + '.Settings'
        this.dbusConfig.path = this.dbusConfig.basePath + '/Settings'

    }

    /**
     * Create a new connection with the given settings for this device.
     * 
     * NetworkManager connection settings are documented here:
     * https://developer.gnome.org/NetworkManager/stable/ch01.html
     * 
     * @param {Object} dbusSettings 
     * @returns {Connection} Connection object that represents the created connection
     */
    async create (dbusSettings) {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.path)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.name)

        const connectionPath = await managerInterface.AddConnection(this.__maskDbusSettings(dbusSettings))

        this.dbusConfig.connectionPath = connectionPath

        return new Connection(this.dbusType, { ...this.dbusConfig, connectionPath: connectionPath }, this.__maskDbusSettings(dbusSettings))
    }

    /**
     * Creates a 802.11 WiFi connection with standard parameters
     * and the given ssid and psk (pre shared key).
     * 
     * If you need more control about your connection, use create()
     * which gives control over the whole dbus settings object.
     * 
     * @param {String} ssid
     * @param {String} psk
     * @param {Object} additionalDbusSettings Optional additional dbus settings (see create() for details)
     * @returns {Connection} Connection object that represents the created connection
     */
    async createWifiClient (ssid, psk, additionalDbusSettings = { }) {

        // TODO: check if psk is long enough (there seems to be a lower limit)

        const dbusSettings = this.__mergeDbusSettings({
            connection: {
                id: ssid + ' (' + this.__generateId() + ')',
                type: '802-11-wireless',
                autoconnect: true
            },
            '802-11-wireless': {
                mode: 'infrastructure',
                ssid: Buffer.from(ssid)
            },
            '802-11-wireless-security': {
                'key-mgmt': 'wpa-psk',
                'auth-alg': 'open',
                psk: psk
            },
            ipv4: {
                method: 'auto'
            },
            ipv6: {
                method: 'ignore'
            }
        }, additionalDbusSettings)

        return this.create(dbusSettings)
    }

    /**
     * Creates a WiFi Access Point with the given `ssid`.
     * If the optional `psk` is passed, the security will be 'wpa-psk'.
     * 
     * @param {String} ssid
     * @param {String} psk
     * @returns {Connection} Connection object that represents the created connection
     */
    async createWifiAccessPoint (ssid, psk = undefined) {

        const dbusSettings = {
            connection: {
                id: ssid + ' (' + this.__generateId() + ')',
                type: '802-11-wireless'
            },
            '802-11-wireless': {
                mode: 'ap',
                ssid: Buffer.from(ssid)
            },
            ipv4: {
                method: 'shared'
            },
            ipv6: {
                method: 'ignore'
            }
        }

        if (psk) {
            dbusSettings['802-11-wireless-security'] = {
                'key-mgmt': 'wpa-psk',
                'auth-alg': 'open',
                psk: psk
            }
        }

        return this.create(dbusSettings)
    }

    /**
     * Returns a list of all stored connections.
     * 
     * @returns 
     */
    async getAll () {

        // get all connection paths:
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.path)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.name)
        const connectionPaths = await managerInterface.ListConnections()

        // This is the way to get and set properties:
        // const propertiesInterface = proxyObject.getInterface(this.dbusConfig.propertiesName)
        // console.log(await propertiesInterface.Get(this.dbusConfig.baseName, 'PrimaryConnection'))
        // await propertiesInterface.Set(this.dbusConfig.baseName, 'PrimaryConnection', '<value>')
        
        // create device objects from those paths:
        const connections = []

        for (const connectionPath of connectionPaths) {

            const connection = new Connection(this.dbusType, { ...this.dbusConfig, connectionPath: connectionPath })
            await connection.load(connectionPath)

            connections.push(connection)
        }

        return connections
    }

    async getBySsid () {
        // TODO: allow to fetch existing connections by SSID to avoid creating new connections for the same network over and over again!
    }

    /**
     * Returns the Connection object for the connection with the given path.
     * 
     * // TODO: Throw proper error if connection doesn't exist!
     * 
     * @param {String} connectionPath 
     * @returns {Connection}
     */
    async getByPath (connectionPath) {

        // load connection settings:
        const connectionProxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, connectionPath)
        const connectionInterface = connectionProxyObject.getInterface(this.dbusConfig.name + '.Connection')
        const connectionSettings = await connectionInterface.GetSettings()

        // return connection object:
        return new Connection(this.dbusType, { ...this.dbusConfig, connectionPath: connectionPath }, connectionSettings)
    }

    __generateId () {
        return Math.random().toString(36).substring(2, 10)
    }

    __mergeDbusSettings(dbusSettings, additionalDbusSettings) {
        return objectDeepMerge(dbusSettings, additionalDbusSettings)
    }

    /**
     * This function takes an object of dbus settings and converts the values
     * to their respective dbus variants using the `variantTypes` object as
     * a reference to map values to their types.
     * 
     * `variantTypes` is optional and does not need to be set. The parameter is
     * only used to support the recursive nature of this function.
     * 
     * // TODO: Might be useful to move this function to a dbus utils module and change the method
     *          signature to have only one parameter `dbusSettings`. Might be also useful to keep
     *          it flexible as it is.
     * 
     * @param {Object} dbusSettings 
     * @param {Object} variantTypes 
     * @returns 
     */
    __maskDbusSettings(dbusSettings, variantTypes = dbusSettingsVariantTypes) {
        
        const result = { ...dbusSettings }

        for (const [key, value] of Object.entries(result)) {
            if (key in variantTypes) {
                if (typeof value === 'object' && !Buffer.isBuffer(value)) { // recurse objects
                    if (key in variantTypes) {
                        result[key] = this.__maskDbusSettings(result[key], variantTypes[key])
                    }
                } else {
                    result[key] = new dbus.Variant(variantTypes[key], value)
                }
            } else {
                throw new TypeError('`' + key + '` is not a valid dbus setting')

            }
        }
        
        return result
    }

}

module.exports = Connections
