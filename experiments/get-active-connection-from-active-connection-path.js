'use strict'

const AccessPoint = require('../lib/access-point')
const NetworkManager = require('../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    // get all devices and list only iface name:
    console.log('\nALL DEVICES:')
    const devices = await nm.devices.getAll()
    for (const device of devices) {
        console.log(device.interface, ' > ', device.dbusConfig.devicePath)
    }

    const selectedDevice = devices[3]

    console.log('\nACTIVE CONNECTIONS:')
    const activeConnection = await selectedDevice.getActiveConnection()
    console.log(activeConnection)
    console.log('activce connection path:', activeConnection.connectionPath)

    // const activeConnectionObject = await nm.connections.getByPath(activeConnection.connectionPath)
    // console.log(activeConnectionObject)
}

main()