'use strict'

const NetworkManager = require('../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    // get all devices and list only iface name:
    const devices = await nm.devices.getAll()
    for (const device of devices) {
        console.log(device.interface)
    }

    console.log('---')

    // get specific device by interface name:
    const ifaceName = devices[devices.length - 1].interface // take the last one in the list
    const myDevice = await nm.devices.getByInterface(ifaceName)
    console.log(myDevice.interface)

    console.log('---')

    // get specific device by device path:
    const devicePath = devices[devices.length - 1].dbusConfig.devicePath // take the last one in the list
    const anotherDevice = await nm.devices.getByPath(devicePath)
    console.log(anotherDevice.interface)


}

main()