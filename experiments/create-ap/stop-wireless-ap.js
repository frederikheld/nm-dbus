'use strict'

const NetworkManager = require('../../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    /*
    // PICK FIRST DEVICE IN LIST

    // list devices with wireless interface:
    const wirelessDevices = await nm.devices.getWireless()

    for (const device of wirelessDevices) {
        console.log(device.interface)
    }

    // select a device to use:
    const selectedDevice = wirelessDevices[0] // built-in wireless device
    // const selectedDevice = wirelessDevices[1] // device 1 (usb stick) does not support access point mode!
    */

    // PICK SPECIFIC DEVICE

    const deviceInterface = 'wlx1cbfce4d80e9'
    const selectedDevice = await nm.devices.getByInterface(deviceInterface)

    
    // CREATE AP
    
    // const connections = await nm.connections.getAll()
    // console.log(connections[0].dbusSettings)

    const connection = await nm.connections.createWifiAccessPoint('test-ap', 'secret-password')

    const activeConnectionPath = await nm.activateConnection(connection, selectedDevice)

    console.log('activeConnectionPath:', activeConnectionPath)


    // DESTROY AP

    setTimeout(async () => {
        await nm.deactivateConnection(activeConnectionPath)

        await nm.disconnect()
    }, 5000)
}

main()
