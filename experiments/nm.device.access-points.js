'use strict'

const NetworkManager = require('../lib/network-manager')

async function main () {
    const nm = new NetworkManager('system')

    // console.log(nm.dbusConfig)
    // console.log(nm.bus)

    console.log('Fetching devices ...')
    const devices = await nm.devices.getAll()
    // console.log('DEVICES:', devices)
    console.log('Done.')
    
    // Check for each device if it has wireless capabilities:
    devices.forEach(async (device, i) => {
        console.log(i, await device.hasWirelessInterface())
    })
    return

    // pick a wireless device from list as an example:

    const device = devices[3]

    // console.log('dbusConfig:', device.accessPoints.dbusConfig)

    console.log('Fetching available access points ...')
    const accessPoints = await device.accessPoints.list()
    console.log('ACCESS POINTS:', accessPoints)

    console.log(Date.now())

    return
}

main()