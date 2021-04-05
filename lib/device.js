'use strict'

const { DeviceNotFoundError, NoWirelessInterfaceError } = require('./errors')

class Device {
    constructor (dbusDeviceProperties) {
        this.dbusProperties = dbusDeviceProperties
    }

    // Note: DBus has a specific type system with signatures which is
    // returned by dbus-next as Variants objects.
    // Those getters are the mechanism to adjust / correct / augment
    // those properties to imrove usability in JS context.
    get udi () { return this.dbusProperties.Udi.value }
    get path () { return this.dbusProperties.Path.value }
    get interface () { return this.dbusProperties.Interface.value }
    get ipInterface () { return this.dbusProperties.IpInterface.value }
    get driver () { return this.dbusProperties.Driver.value }
    get driverVersion () { return this.dbusProperties.DriverVersion.value }
    get firmwareVersion () { return this.dbusProperties.FirmwareVersion.value }
    get capabilities () { return this.dbusProperties.Capabilities.value }
    get ip4Address () { return this.dbusProperties.Ip4Address.value }
    get state () { return this.dbusProperties.State.value }
    get stateReason () { return this.dbusProperties.StateReason.value }
    get activeConnection () { return this.dbusProperties.ActiveConnection.value }
    get ip4Config () { return this.dbusProperties.Ip4Config.value }
    get dhcp4Config () { return this.dbusProperties.Dhcp4Config.value }
    get ip6Config () { return this.dbusProperties.Ip6Config.value }
    get dhcp6Config () { return this.dbusProperties.Dhcp6Config.value }
    get managed () { return this.dbusProperties.Managed.value }
    get autoconnect () { return this.dbusProperties.Autoconnect.value }
    get firmwareMissing () { return this.dbusProperties.FirmwareMissing.value }
    get nmPluginMissing () { return this.dbusProperties.NmPluginMissing.value }
    get deviceType () { return this.dbusProperties.DeviceType.value }
    get availableConnections () { return this.dbusProperties.AvailableConnections.value }
    get physicalPortalId () { return this.dbusProperties.PhysicalPortalId.value }
    get mtu () { return this.dbusProperties.Mtu.value }
    get metered () { return this.dbusProperties.Metered.value }
    get lldpNeighbors () { return this.dbusProperties.LldpNeighbors.value }
    get real () { return this.dbusProperties.Real.value }
    get ip4Connectivity () { return this.dbusProperties.Ip4Connectivity.value }
    get ip6Connectivity () { return this.dbusProperties.Ip6Connectivity.value }
    get interfaceFlags () { return this.dbusProperties.InterfaceFlags.value }
    get hwAddress () { return this.dbusProperties.HwAddress.value }

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
}

module.exports = Device