'use strict'

class Connection {
    constructor (bus, dbusConfig) {
        this.bus = bus
        
        this.dbusName = dbusConfig.dbusName
        this.dbusPath = dbusConfig.dbusPath
        this.dbusPropertiesName = dbusConfig.dbusPropertiesName
    }
}

module.exports = Connection