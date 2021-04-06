'use strict'

const DBusObject = require("./dbus-object")

// const AccessPoint = require('./access-point')

class AccessPoints extends DBusObject {
    constructor (dbusDeviceProperties, dbusType, dbusConfig) {
        super(dbusType, dbusConfig)

        this.dbusDeviceProperties = dbusDeviceProperties
        
        this.dbusConfig.name += '.Wireless'
        this.dbusConfig.path += '/Wireless'
    }

    /**
     * Returns a list of all available access points on the network device.
     * 
     * @returns 
     */
    async listAll () {

        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.devicePath)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.name)

        managerInterface.RequestScan({})

        // get access point paths:
        const accessPointPaths = await new Promise(async (resolve, reject) => {
            const promiseScan = new Promise((resolve, reject) => {
                managerInterface.on('AccessPointAdded', (iface, changed, invalidated) => {
                    resolve()
                })
            })

            const promiseTimeout = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 5000)
            })

            await Promise.race([promiseScan, promiseTimeout])

            resolve(managerInterface.GetAllAccessPoints())
        })
        // Note: deviceManagerInterface.RequestScan() will immediately return
        // on('AccessPointAdded') will trigger whenever a new AP is found. Usually the first time the event
        // occurs the list is already complete. So we can wait for the event to trigger and then resolve the
        // promise that returns all access points. The timeout makes sure that the promise resolves even
        // if the scan doesn't find any new access points.
        // TODO: replace the hard-coded timeout with a config value!
        // Note: RequestScan() expects an object as mandatory paramter. This can be left empty, but it can
        // also be used to filter the returned access points. See https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Device.Wireless.html#gdbus-method-org-freedesktop-NetworkManager-Device-Wireless.RequestScan

        // get properties to those paths:
        const accessPointsList = [ ]

        for (const apPath of accessPointPaths) {

            const apProxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, apPath)

            const apPropertiesInterface = apProxyObject.getInterface(this.dbusConfig.propertiesName)
            // const apSsid = await apPropertiesInterface.Get(this.dbusConfig.baseName + '.AccessPoint', 'Ssid') // if you only want to get one property
            const allProperties = await apPropertiesInterface.GetAll(this.dbusConfig.baseName + '.AccessPoint')

            // Clean up and augment properties:
            const cleanedProperties = {
                Flags: allProperties.Flags.value,
                WpaFlags: allProperties.WpaFlags.value,
                RsnFlags: allProperties.RsnFlags.value,
                Ssid: allProperties.Ssid.value.toString(),
                Frequency: allProperties.Frequency.value,
                FrequencyString: this.constructor.convertFrequencyToString(allProperties.Frequency.value),
                HwAddress: allProperties.HwAddress.value,
                Mode: allProperties.Mode.value,
                MaxBitrate: allProperties.MaxBitrate.value,
                Strength: allProperties.Strength.value,
                LastSeen: allProperties.LastSeen.value
            }
            // Note: we are doing this explicitly (instead of array.map) here to control
            // what the object that is being returned is going to look like.
            
            accessPointsList.push(cleanedProperties)

        }

        return accessPointsList
    }

    static convertFrequencyToString (frequency) {

        // Source: https://en.wikipedia.org/wiki/List_of_WLAN_channels#4.9%E2%80%935.0_GHz_(802.11j)_WLAN

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

module.exports = AccessPoints