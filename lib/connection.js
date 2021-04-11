'use strict'

const dbus = require('dbus-next')
const DBusObject = require('./dbus-object')

class Connection extends DBusObject {
    constructor (dbusType, dbusConfig, dbusSettings = { }) {
        super(dbusType, dbusConfig)

        // console.log('Connection dbusConfig before:', dbusConfig)

        // this.dbusConfig.name += '.Connection'
        // this.dbusConfig.path += '/Connection'
        this.dbusConfig.name = this.dbusConfig.baseName + '.Settings.Connection'
        this.dbusConfig.path = this.dbusConfig.basePath + '/Settings/Connection'

        // console.log('Connection dbusConfig after:', this.dbusConfig)

        this.dbusSettings = dbusSettings   
    }


    // -- GETTERS

    get connectionId () {
        return this.dbusSettings.connection.id.value
    }

    get connectionPath () {
        return this.dbusConfig.connectionPath
    }


    // -- SETTERS

    set connectionId (id) {
        if (!this.dbusSettings.connection) { this.dbusSettings.connection = { } }
        this.dbusSettings.connection.id = new dbus.Variant('s', id)
    }

    
    // -- FUNCTIONS FOR INTERACTION WITH DBUS

    /**
     * Loads the connection properties and stored settings of the connection
     * from the given `connectionPath`.
     */
    async load (connectionPath) {
        this.dbusConfig.connectionPath = connectionPath

        // load connection properties:

        const connectionProxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.connectionPath)

        const connectionPropertiesInterface = connectionProxyObject.getInterface(this.dbusConfig.propertiesName)
        const connectionProperties = await connectionPropertiesInterface.GetAll(this.dbusConfig.name)

        this.dbusProperties = connectionProperties
        // console.log('Connection dbusProperties:', this.dbusProperties)

        // load connection settings:

        const connectionInterface = connectionProxyObject.getInterface(this.dbusConfig.name)
        const connectionSettings = await connectionInterface.GetSettings()

        this.dbusSettings = connectionSettings
        // console.log('Connection dbusSettings:', this.dbusSettings)
    }

    /**
     * Saves the changes to the connection parameters to NetworkManager.
     */
    async save () {
        // console.log('baseName:', this.dbusConfig.baseName)
        // console.log('basePath:', this.dbusConfig.basePath)
        // console.log('connectionPath before:', this.dbusConfig.connectionPath)

        // console.log('Update connection')
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.connectionPath)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.name)

        await managerInterface.Update(this.dbusSettings)
        
        // console.log('connectionPath after:', this.dbusConfig.connectionPath)

    }

    async delete () {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.connectionPath)
        const managerInterface = await proxyObject.getInterface(this.dbusConfig.name)

        await managerInterface.Delete()
    }


    __generateId () {
        return Math.random().toString(36).substring(2, 10)
    }

}

module.exports = Connection
