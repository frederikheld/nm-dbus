'use strict'

const { DeviceNotFoundError, NoWirelessInterfaceError } = require('./errors')

class Device {
    constructor (dbusDeviceProperties) {
        this.dbusProperties = dbusDeviceProperties
        console.log(dbusDeviceProperties)
    }

    // Note: DBus has a specific type system with signatures which is
    // returned by dbus-next as Variants objects.
    // Those getters are the mechanism to adjust / correct / augment
    // those properties to imrove usability in JS context.
    get udi () { return this.deviceProperties.Udi.value }
    get path () { return this.deviceProperties.Path.value }
    get interface () { return this.deviceProperties.Interface.value }
    get ipInterface () { return this.deviceProperties.IpInterface.value }
    get driver () { return this.deviceProperties.Driver.value }
    get driverVersion () { return this.deviceProperties.DriverVersion.value }
    get firmwareVersion () { return this.deviceProperties.FirmwareVersion.value }
    get capabilities () { return this.deviceProperties.Capabilities.value }
    get ip4Address () { return this.deviceProperties.Ip4Address.value }
    get state () { return this.deviceProperties.State.value }
    get stateReason () { return this.deviceProperties.StateReason.value }
    get activeConnection () { return this.deviceProperties.ActiveConnection.value }
    get ip4Config () { return this.deviceProperties.Ip4Config.value }
    get dhcp4Config () { return this.deviceProperties.Dhcp4Config.value }
    get ip6Config () { return this.deviceProperties.Ip6Config.value }
    get dhcp6Config () { return this.deviceProperties.Dhcp6Config.value }
    get managed () { return this.deviceProperties.Managed.value }
    get autoconnect () { return this.deviceProperties.Autoconnect.value }
    get firmwareMissing () { return this.deviceProperties.FirmwareMissing.value }
    get nmPluginMissing () { return this.deviceProperties.NmPluginMissing.value }
    get deviceType () { return this.deviceProperties.DeviceType.value }
    get availableConnections () { return this.deviceProperties.AvailableConnections.value }
    get physicalPortalId () { return this.deviceProperties.PhysicalPortalId.value }
    get mtu () { return this.deviceProperties.Mtu.value }
    get metered () { return this.deviceProperties.Metered.value }
    get lldpNeighbors () { return this.deviceProperties.LldpNeighbors.value }
    get real () { return this.deviceProperties.Real.value }
    get ip4Connectivity () { return this.deviceProperties.Ip4Connectivity.value }
    get ip6Connectivity () { return this.deviceProperties.Ip6Connectivity.value }
    get interfaceFlags () { return this.deviceProperties.InterfaceFlags.value }
    get hwAddress () { return this.deviceProperties.HwAddress.value }

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