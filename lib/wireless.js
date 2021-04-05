'use strict'

class Wireless {
    construct() { }

    hello() {
        console.log('Hello, this is Wireless!')
    }

    async status () {
        // const proxyObject = await this.bus.getProxyObject(this.dbusName, this.dbusPath)
        const propertiesInterface = this.proxyObject.getInterface(this.dbusPropertiesName)
        // const managerInterface = this.proxyObject.getInterface(this.dbusName)

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