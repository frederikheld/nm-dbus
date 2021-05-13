'use strict'

const NetworkManager = require('../../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    const deviceInterface = 'wlx1cbfce4d80e9'
    const selectedDevice = await nm.devices.getByInterface(deviceInterface)

    await selectedDevice.disconnect()

    await nm.disconnect()
}

main()
