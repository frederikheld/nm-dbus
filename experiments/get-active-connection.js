'use strict'

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
    console.log('actice connection:', activeConnection)

    // // list all stored connections for comparison:
    // const connections = await nm.connections.getAll()
    // console.log('\nALL CONNECTIONS:')
    // for (const connection of connections) {
    //     console.log(connection.dbusConfig.connectionPath)
    // }
}

main()