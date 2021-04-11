'use strict'

const fs = require('fs')

const NetworkManager = require('../../lib/network-manager')

const CONFIG = JSON.parse(fs.readFileSync('./config.json', { encoding: 'UTF-8' }))

async function main () {

    const nm = new NetworkManager()

    // Connetion path of previously configured connection
    // (you need to adjust this to an existing wifi connection!):
    // const connectionPath = '/org/freedesktop/NetworkManager/Settings/100'

    // -- LIST INVENTORY

    // list available connections:
    console.log('\nCONNECTIONS:')
    const connections = await nm.connections.getAll()
    connections.forEach((connection, i) => {
        console.log(i + ': ' + connection.connectionId + ' > ' + connection.dbusConfig.connectionPath)
    })

    // list available devices:
    console.log('\nDEVICES:')
    const devices = await nm.devices.getAll()
    for (const [i, device] of devices.entries()) {
        console.log(i + ': ' + device.interface + (await device.hasWirelessInterface() ? ' [wireless]' : '') + ' > ' + device.devicePath)
    }

    // -- PICK CONNECTION, DEVICE AND ACCESS POINT FROM INVENTORY

    const connectionObject = connections[12]
    // const connectionObject = connections[11] // alternative
    const connectionPath = connectionObject.connectionPath
    const deviceObject = devices[3]
    const devicePath = deviceObject.devicePath

    // list access points visible by picked device:
    console.log('\nACCESS POINTS VISIBLE BY ' + deviceObject.interface + ':')
    const accessPoints = await deviceObject.accessPoints.getAll()
    for (const [i, ap] of accessPoints.entries()) {
        console.log(i + ': ' + ap.ssid + ' (' + ap.frequencyString + ') > ' + ap.accessPointPath)
    }

    const accessPointObject = accessPoints[2]
    // const accessPointObject = accessPoints[1] // alternative
    const accessPointPath = accessPointObject.accessPointPath


    // -- ACTIVATE CONNECTION

    // activate connection:
    console.log('Activating connection ...')

    await nm.activateConnection(
        connectionObject,
        deviceObject,
        accessPointObject
    )

    console.log('Done.')

    // deactivate connection:
    // setTimeout(async () => {

    //     console.log('Deactivating connection ...')
    //     await newConnection.deactivate()
    //     console.log('Done.')

    // }, 10000)

}

main()
