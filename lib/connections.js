'use strict'

const dbus = require('dbus-next')

const DBusObject = require("./dbus-object")
const Connection = require('./connection')

class Connections extends DBusObject {
    constructor (dbusType, dbusConfig) {
        super(dbusType, dbusConfig)

        // console.log('Connections dbusConfig before:', dbusConfig)
        
        // this.dbusConfig.name += '.Settings'
        // this.dbusConfig.path += '/Settings'
        this.dbusConfig.name = this.dbusConfig.baseName + '.Settings'
        this.dbusConfig.path = this.dbusConfig.basePath + '/Settings'

        // console.log('Connections dbusConfig after:', this.dbusConfig)
    }

    /**
     * Create a new connection with the given settings for this device.
     * 
     * NetworkManager connection settings are documented here:
     * https://developer.gnome.org/NetworkManager/stable/ch01.html
     * 
     * @param {*} dbusSettings 
     * @returns {Connection} Connection object that represents the created connection
     */
    async create (dbusSettings) {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.path)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.name)

        const connectionPath = await managerInterface.AddConnection(dbusSettings)

        this.dbusConfig.connectionPath = connectionPath

        return new Connection(this.dbusType, { ...this.dbusConfig, connectionPath: connectionPath }, dbusSettings)
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
     * @returns {Connection} Connection object that represents the created connection
     */
    async createWifiClient (ssid, psk) {

        const dbusSettings = {
            connection: {
                id: new dbus.Variant('s', ssid + ' (' + this.__generateId() + ')'), // TODO: provide as parameter
                type: new dbus.Variant('s', '802-11-wireless'),
                autoconnect: new dbus.Variant('b', true) // TODO: provide as parameter
            },
            '802-11-wireless': {
                mode: new dbus.Variant('s', 'infrastructure'),
                ssid: new dbus.Variant('ay', Buffer.from(ssid))
            },
            '802-11-wireless-security': {
                'key-mgmt': new dbus.Variant('s', 'wpa-psk'), // TODO: provide as paramenter
                'auth-alg': new dbus.Variant('s', 'open'), // TODO: provide as parameter
                psk: new dbus.Variant('s', psk)
            },
            ipv4: {
                method: new dbus.Variant('s', 'auto') // TODO: provide as parameter
            },
            ipv6: {
                method: new dbus.Variant('s', 'ignore') // TODO: here 'auto' as well? // TODO: provide as parameter
            }
        }

        return this.create(dbusSettings)
    }

    async createWifiAccessPoint (ssid, psk = undefined) {

        // TODO: add parameter that enables/disables sharing of internet connection on the device

        const dbusSettings = {
            connection: {
                id: new dbus.Variant('s', ssid + ' (' + this.__generateId() + ')'), // TODO: provide as parameter
                type: new dbus.Variant('s', '802-11-wireless'),
            },
            '802-11-wireless': {
                mode: new dbus.Variant('s', 'ap'),
                ssid: new dbus.Variant('ay', Buffer.from(ssid))
            },
            ipv4: {
                method: new dbus.Variant('s', 'shared') // TODO: provide as parameter
            },
            ipv6: {
                method: new dbus.Variant('s', 'ignore') // TODO: here 'auto' as well? // TODO: provide as parameter
            }
        }

        if (psk) {
            dbusSettings['802-11-wireless-security'] = {
                'key-mgmt': new dbus.Variant('s', 'wpa-psk'),
                'auth-alg': new dbus.Variant('s', 'open'),
                psk: new dbus.Variant('s', psk)
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

    __generateId () {
        return Math.random().toString(36).substring(2, 10)
    }

}

module.exports = Connections
