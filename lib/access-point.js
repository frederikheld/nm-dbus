'use strict'

const DBusObject = require('./dbus-object')

class AccessPoint extends DBusObject {
    constructor (dbusProperties, dbusType, dbusConfig) {
        super(dbusType, dbusConfig)

        this.dbusProperties = dbusProperties

        // this.dbusConfig.name += '.Device'
        // this.dbusConfig.path += '/device'
    
    }

    
    // -- GETTERS

    get accessPointPath () {
        return this.dbusConfig.accessPointPath
    }

    // Note: DBus has a specific type system with signatures which is
    // returned by dbus-next as Variants objects.
    // These getters here are the mechanism to adjust / correct / augment
    // those properties to imrove usability in JS context.
    get flags () { return this.dbusProperties.Flags.value }
    get wpaFlags () { return this.dbusProperties.WpaFlags.value }
    get rsnFlags () { return this.dbusProperties.RsnFlags.value }
    get ssid () { return this.dbusProperties.Ssid.value.toString() }
    get frequency () { return this.dbusProperties.Frequency.value }
    get frequencyString () { return this.constructor.convertFrequencyToString(this.dbusProperties.Frequency.value) }
    get hwAddress () { return this.dbusProperties.HwAddress.value }
    get mode () { return this.dbusProperties.Mode.value }
    get maxBitrate () { return this.dbusProperties.MaxBitrate.value }
    get strength () { return this.dbusProperties.Strength.value }
    get lastSeen () { return this.dbusProperties.LastSeen.value }

    /**
     * Returns all properties as an object.
     * Compared to the dbusProperties, this object contains the cleaned
     * values that you can also get individually via the getters.
     */
    get properties () {
        return {
            flags: this.flags,
            wpaFlags: this.wpaFlags,
            rsnFlags: this.rsnFlags,
            ssid: this.ssid,
            frequency: this.frequency,
            frequencyString: this.frequencyString,
            hwAddress: this.hwAddress,
            mode: this.mode,
            maxBitrate: this.maxBitrate,
            strength: this.strength,
            lastSeen: this.lastSeen
        }
    }

    /**
     * Use `NetworkManager.activateConnection()` instead!
     * 
     * @param {*} frequency 
     * @returns 
     */
    // async connect () {

    //     // console.log('AccessPoint.connect()')

    //     console.log(this.dbusConfig.accessPointPath)
    //     const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.accessPointPath)
        
    //     // const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.basePath)
    //     // const propertiesInterface = proxyObject.getInterface(this.dbusConfig.propertiesName)

    //     // const wirelessIsEnabled = await this.isEnabled()
    //     // if (wirelessIsEnabled) {
    //     //     return true // return immediately as WiFi is already enabled
    //     // }

    //     // await propertiesInterface.Set(this.dbusConfig.baseName, 'WirelessEnabled', new dbus.Variant('b', true))
        
    //     // // TODO: check if WiFi is enabled before returning! This will also require a timeout in case the WiFi can't be enabled. The function should return 'false' then.

    //     // return true
    // }

    static convertFrequencyToString (frequency) {

        // Source: https://en.wikipedia.org/wiki/List_of_WLAN_channels

        if (frequency >= 755 && frequency <= 928) {
            return '900 MHz'
        }

        if (frequency >= 2401 && frequency <= 2495) {
            return '2.4 GHz'
        }

        if (frequency >= 5030 && frequency <= 5895) {
            return '5 GHz'
        }

        return '?'
    }

}

module.exports = AccessPoint