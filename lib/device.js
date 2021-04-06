'use strict'

const { DeviceNotFoundError, NoWirelessInterfaceError } = require('./errors')

const AccessPoints = require('./access-points')

class Device {
    constructor (dbus, dbusConfig, dbusDeviceProperties) {
        this.dbus = dbus
        
        this.dbusName = dbusConfig.dbusName + '.Device'
        this.dbusPath = dbusConfig.dbusPath + '/device'
        this.dbusPropertiesName = dbusConfig.dbusPropertiesName

        this.dbusDeviceProperties = dbusDeviceProperties
        

        // init sub-modules:
        this.accessPoints = new AccessPoints(this.bus, this.dbusConfig)
    }

    // Note: DBus has a specific type system with signatures which is
    // returned by dbus-next as Variants objects.
    // Those getters are the mechanism to adjust / correct / augment
    // those properties to imrove usability in JS context.
    get udi () { return this.dbusDeviceProperties.Udi.value }
    get path () { return this.dbusDeviceProperties.Path.value }
    get interface () { return this.dbusDeviceProperties.Interface.value }
    get ipInterface () { return this.dbusDeviceProperties.IpInterface.value }
    get driver () { return this.dbusDeviceProperties.Driver.value }
    get driverVersion () { return this.dbusDeviceProperties.DriverVersion.value }
    get firmwareVersion () { return this.dbusDeviceProperties.FirmwareVersion.value }
    get capabilities () { return this.dbusDeviceProperties.Capabilities.value }
    get ip4Address () { return this.dbusDeviceProperties.Ip4Address.value }
    get state () { return this.dbusDeviceProperties.State.value }
    get stateReason () { return this.dbusDeviceProperties.StateReason.value }
    get activeConnection () { return this.dbusDeviceProperties.ActiveConnection.value }
    get ip4Config () { return this.dbusDeviceProperties.Ip4Config.value }
    get dhcp4Config () { return this.dbusDeviceProperties.Dhcp4Config.value }
    get ip6Config () { return this.dbusDeviceProperties.Ip6Config.value }
    get dhcp6Config () { return this.dbusDeviceProperties.Dhcp6Config.value }
    get managed () { return this.dbusDeviceProperties.Managed.value }
    get autoconnect () { return this.dbusDeviceProperties.Autoconnect.value }
    get firmwareMissing () { return this.dbusDeviceProperties.FirmwareMissing.value }
    get nmPluginMissing () { return this.dbusDeviceProperties.NmPluginMissing.value }
    get deviceType () { return this.dbusDeviceProperties.DeviceType.value }
    get availableConnections () { return this.dbusDeviceProperties.AvailableConnections.value }
    get physicalPortalId () { return this.dbusDeviceProperties.PhysicalPortalId.value }
    get mtu () { return this.dbusDeviceProperties.Mtu.value }
    get metered () { return this.dbusDeviceProperties.Metered.value }
    get lldpNeighbors () { return this.dbusDeviceProperties.LldpNeighbors.value }
    get real () { return this.dbusDeviceProperties.Real.value }
    get ip4Connectivity () { return this.dbusDeviceProperties.Ip4Connectivity.value }
    get ip6Connectivity () { return this.dbusDeviceProperties.Ip6Connectivity.value }
    get interfaceFlags () { return this.dbusDeviceProperties.InterfaceFlags.value }
    get hwAddress () { return this.dbusDeviceProperties.HwAddress.value }

    /**
     * Returns all properties as an object.
     * Compared to the dbusProperties, this object contains the cleaned
     * values that you can also get individually via the getters.
     */
    get properties () {
        return {
            udi: this.udi,
            path: this.path,
            interface: this.interface,
            ipInterface: this.ipInterface,
            driver: this.driver,
            driverVersion: this.driverVersion,
            firmwareVersion: this.firmwareVersion,
            capabilities: this.capabilities,
            ip4Address: this.ip4Address,
            state: this.state,
            stateReason: this.stateReason,
            activeConnection: this.activeConnection,
            ip4Config: this.ip4Config,
            dhcp4Config: this.dhcp4Config,
            managed: this.managed,
            autoconnect: this.autoconnect,
            firmwareMissing: this.firmwareMissing,
            nmPluginMissing: this.nmPluginMissing,
            deviceType: this.deviceType,
            availableConnections: this.availableConnections,
            pyhsicalPortalId: this.physicalPortalId,
            mtu: this.mtu,
            metered: this.metered,
            lldpNeighbors: this.lldpNeighbors,
            real: this.real,
            ip4Connectivity: this.ip4Connectivity,
            ip6Connectivity: this.ip6Connectivity,
            interfaceFlags: this.interfaceFlags,
            hwAddress: this.hwAddress
        }
    }

    get dbusConfig () {
        return {
            dbusName: this.dbusName,
            dbusPath: this.dbusPath,
            dbusPropertiesName: this.dbusPropertiesName
        }
    }

}

module.exports = Device