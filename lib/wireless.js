'use strict'

const dbus = require('dbus-next')
const DBusObject = require('./dbus-object')

class Wireless extends DBusObject {
    constructor (dbusType, dbusConfig) {
        super (dbusType, dbusConfig)
    }

    /**
     * Returns the true if wireless is enabled, otherwise false
     * 
     * @returns {Boolean}
     */
    async isEnabled () {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const propertiesInterface = proxyObject.getInterface(this.dbusConfig.propertiesName)
        const wirelessIsEnabled = await propertiesInterface.Get(this.dbusConfig.baseName, 'WirelessEnabled')

        return wirelessIsEnabled.value
    }

    /**
     * Returns an object that merges the results of all isSomething() functions
     * into one status object.
     * 
     * @returns {Object} status
     */
    async status () {
        return {
            enabled: await this.isEnabled()
        }
        // TODO: if I add all values with async functions, will they run in parallel or sequentially?
        // Should be parallel here. Might need refactoring to a Promise.all() construct.
    }

    /**
     * Turns on wireless. Returns true if WiFi is activated.
     * 
     * Note: this function does not inform if the WiFi was just enabled
     * by the function or has been enabled before.
     * If you need this information, check with Wireless.isEnabled() first.
     * 
     * @returns {Boolean}
     */
    async enable () {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const propertiesInterface = proxyObject.getInterface(this.dbusConfig.propertiesName)

        const wirelessIsEnabled = await this.isEnabled()
        if (wirelessIsEnabled) {
            return true // return immediately as WiFi is already enabled
        }

        await propertiesInterface.Set(this.dbusConfig.baseName, 'WirelessEnabled', new dbus.Variant('b', true))
        
        // TODO: check if WiFi is enabled before returning! This will also require a timeout in case the WiFi can't be enabled. The function should return 'false' then.

        return true
    }

    /**
     * Turns off wireless. Returns true if WiFi is deactivated.
     * 
     * Note: this function does not inform if the WiFi was just disabled
     * by the function or has been disabled before.
     * If you need this information, check with Wireless.isEnabled() first.
     * 
     * @returns {Boolean}
     */
    async disable () {
        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
        const propertiesInterface = proxyObject.getInterface(this.dbusConfig.propertiesName)

        const wirelessIsEnabled = await this.isEnabled()
        if (!wirelessIsEnabled) {
            return true // return immediately as WiFi is already disabled
        }

        await propertiesInterface.Set(this.dbusConfig.baseName, 'WirelessEnabled', new dbus.Variant('b', false))
        
        // TODO: check if WiFi is disabled before returning! This will also require a timeout in case the WiFi can't be disabled. The function should return 'false' then.

        return true
    }
}

module.exports = Wireless