'use strict'

const NetworkManager = require('../../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    // list devices with wireless interface:
    const wirelessDevices = await nm.devices.getWireless()

    for (const device of wirelessDevices) {
        console.log(device.interface)
    }

    // select a device to use:
    const selectedDevice = wirelessDevices[0] // built-in wireless device
    // const selectedDevice = wirelessDevices[1] // device 1 (usb stick) does not support access point mode!

    
    const connections = await nm.connections.getAll()
    console.log(connections[0].dbusSettings)

    const connection = await nm.connections.createWifiAccessPoint('test-ap', 'secret-password')

    const activeConnection = await nm.activateConnection(connection, selectedDevice)

    console.log(activeConnection)
}

main()
