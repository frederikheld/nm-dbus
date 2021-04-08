'use strict'

const DBusObject = require('./dbus-object')

class AccessPoint extends DBusObject {
    constructor (dbusAPProperties, dbusType, dbusConfig) {
        super(dbusType, dbusConfig)

        this.dbusAPProperties = dbusAPProperties

        // this.dbusConfig.name += '.Device'
        // this.dbusConfig.path += '/device'
    
    }

    // Note: DBus has a specific type system with signatures which is
    // returned by dbus-next as Variants objects.
    // These getters here are the mechanism to adjust / correct / augment
    // those properties to imrove usability in JS context.
        get flags () { return this.dbusAPProperties.Flags.value }
        get wpaFlags () { return this.dbusAPProperties.WpaFlags.value }
        get rsnFlags () { return this.dbusAPProperties.RsnFlags.value }
        get ssid () { return this.dbusAPProperties.Ssid.value.toString() }
        get frequency () { return this.dbusAPProperties.Frequency.value }
        get frequencyString () { return this.constructor.convertFrequencyToString(this.dbusAPProperties.Frequency.value) }
        get hwAddress () { return this.dbusAPProperties.HwAddress.value }
        get mode () { return this.dbusAPProperties.Mode.value }
        get maxBitrate () { return this.dbusAPProperties.MaxBitrate.value }
        get strength () { return this.dbusAPProperties.Strength.value }
        get lastSeen () { return this.dbusAPProperties.LastSeen.value }

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
            frequencyString: this.frequency,
            hwAddress: this.hwAddress,
            mode: this.mode,
            maxBitrate: this.maxBitrate,
            strength: this.strength,
            lastSeen: this.lastSeen
        }
    }

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