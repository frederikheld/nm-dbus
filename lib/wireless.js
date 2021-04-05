'use strict'

class Wireless {
    constructor (bus, dbusConfig) {
        this.bus = bus
        
        this.dbusName = dbusConfig.dbusName
        this.dbusPath = dbusConfig.dbusPath
        this.dbusPropertiesName = dbusConfig.dbusPropertiesName
    }

    async status () {
        const proxyObject = await this.bus.getProxyObject(this.dbusName, this.dbusPath)
        const propertiesInterface = proxyObject.getInterface(this.dbusPropertiesName)

        const wirelessIsEnabled = await propertiesInterface.Get(this.dbusName, 'WirelessEnabled')

        return {
            enabled: wirelessIsEnabled.value
        }
    }

    async enable () {

    }

    async disable () {

    }
}

module.exports = Wireless