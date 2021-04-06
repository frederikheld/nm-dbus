'use strict'

const NetworkManager = require('../lib/network-manager')

async function main () {
    const nm = new NetworkManager('system')

    // console.log(nm.dbusConfig)
    // console.log(nm.bus)

    console.log('Fetching devices ...')
    const devices = await nm.devices.getAll()
    // const devices = await nm.getDevices()
    // console.log('DEVICES:', devices)
    console.log('Done.')

    const wirelessDevices = await nm.devices.getWireless()
    console.log('# of wireless devices', wirelessDevices.length)
    
    // Check for each device if it has wireless capabilities:
    for (const [i, device] of devices.entries()) {
        console.log(i, await device.hasWirelessInterface())
    }

    // Check if wireless is enabled:
    console.log('wireless enabled:', await nm.wireless.isEnabled())

    // pick first wireless device from list as an example:

    const device = wirelessDevices[0]
    console.log(await device.hasWirelessInterface())

    // console.log('dbusConfig:', device.accessPoints.dbusConfig)

    console.log('Fetching available access points ...')
    const accessPoints = await device.accessPoints.listAll()
    console.log('ACCESS POINTS:', accessPoints)

    console.log(Date.now())

    return
}

main()