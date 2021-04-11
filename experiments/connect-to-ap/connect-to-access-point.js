'use strict'

const fs = require('fs')
const AccessPoint = require('../../lib/access-point')
const NetworkManager = require('../../lib/network-manager')

const CONFIG = JSON.parse(fs.readFileSync('./config.json', { encoding: 'UTF-8' }))

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

    // Pick first wireless device from list as an example:
    
    const device = wirelessDevices[0]
    console.log(await device.hasWirelessInterface())

    // Fetch access points:

    console.log('Fetching available access points ...')
    const accessPoints = await device.accessPoints.getAll()

    console.log('ACCESS POINTS:', accessPoints.map((ap) => {
        return ap.ssid + ' > ' + ap.dbusConfig.accessPointPath
    }))

    // Get access point with configured ssid:
    const accessPoint = accessPoints.filter((ap) => {
        return ap.ssid === CONFIG.ssid
    })
    // Note: accessPoint is an array. SSID's can be re-used in
    // different frequency bands. An AP with SSIF 'foo' can exist
    // in the 5 GHz band as well as in the 2.4 GHz band. This is
    // common practice for many routers.

    // console.log('accessPoint objects list:', accessPoint)

    // Check for stored connections for this AP:

    // If not found: create a new connection for this AP:

    // Activate connection (known or new):

    // Connect to access point:
    await accessPoint[0].connect()




    console.log(Date.now())

    return
}

main()