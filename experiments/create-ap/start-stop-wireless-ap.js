'use strict'

const NetworkManager = require('../../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    const deviceInterface = 'wlx1cbfce4d80e9'
    const selectedDevice = await nm.devices.getByInterface(deviceInterface)

    const connection = await nm.connections.createWifiAccessPoint('test-ap', 'secret-password')

    const activeConnectionPath = await nm.activateConnection(connection, selectedDevice)

    console.log(activeConnectionPath)

    setTimeout(async () => {
        await selectedDevice.disconnect()
        await nm.disconnect()
    }, 1000)
}

main()
