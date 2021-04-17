'use strict'

const DBusObject = require("./dbus-object")
const AccessPoint = require('./access-point')

class AccessPoints extends DBusObject {
    constructor (dbusDeviceProperties, dbusType, dbusConfig) {
        super(dbusType, dbusConfig)

        this.dbusDeviceProperties = dbusDeviceProperties
        
        this.dbusConfig.name += '.Wireless'
        this.dbusConfig.path += '/Wireless'
    }

    async getBySsid () {
        // TODO: Allow to fetch an access point with a specific SSID for convenience
    }

    /**
     * Returns a list of all available access points on the network device.
     * 
     * @returns 
     */
    async getAll () {

        const proxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, this.dbusConfig.devicePath)
        const managerInterface = proxyObject.getInterface(this.dbusConfig.name)

        managerInterface.RequestScan({})

        // get access point paths:
        const apPaths = await new Promise(async (resolve, reject) => {
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
        // Note: managerInterface.RequestScan() will immediately return
        // on('AccessPointAdded') will trigger whenever a new AP is found. Usually the first time the event
        // occurs the list is already complete. So we can wait for the event to trigger and then resolve the
        // promise that returns all access points. The timeout makes sure that the promise resolves even
        // if the scan doesn't find any new access points.
        // TODO: replace the hard-coded timeout with a config value!
        // Note: RequestScan() expects an object as mandatory paramter. This can be left empty, but it can
        // also be used to filter the returned access points. See https://developer.gnome.org/NetworkManager/stable/gdbus-org.freedesktop.NetworkManager.Device.Wireless.html#gdbus-method-org-freedesktop-NetworkManager-Device-Wireless.RequestScan

        // get properties to those paths:
        const accessPointsList = [ ]

        for (const apPath of apPaths) {

            const apProxyObject = await this.bus.getProxyObject(this.dbusConfig.baseName, apPath)

            const apPropertiesInterface = apProxyObject.getInterface(this.dbusConfig.propertiesName)
            // const apSsid = await apPropertiesInterface.Get(this.dbusConfig.baseName + '.AccessPoint', 'Ssid') // if you only want to get one property
            const apProperties = await apPropertiesInterface.GetAll(this.dbusConfig.baseName + '.AccessPoint')
            
            accessPointsList.push(new AccessPoint(apProperties, this.dbusType, {
                ...this.dbusConfig,
                accessPointPath: apPath
            }))

        }

        return accessPointsList
    }

}

module.exports = AccessPoints