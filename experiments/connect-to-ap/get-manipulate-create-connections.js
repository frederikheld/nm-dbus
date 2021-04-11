'use strict'

const fs = require('fs')

const NetworkManager = require('../../lib/network-manager')

const CONFIG = JSON.parse(fs.readFileSync('./config.json', { encoding: 'UTF-8' }))

function generateId () {
    return Math.random().toString(36).substring(2, 10)
}

async function main () {

    // -- LOAD ALL CONNECTIONS

    const nm = new NetworkManager()

    // list existing connections:
    const connections = await nm.connections.getAll()
    connections.forEach((connection) => {
        console.log(connection.connectionId + ' > ' + connection.dbusConfig.connectionPath)
    })

    // const connection = connections[4]


    console.log('==========')
    // console.log(connection)

    // console.log(connection.dbusProperties.properties.connection)


    // -- LOAD AND MANIPULATE EXISTING CONNECTION

    // connetion path of previously configured connection
    // (you need to adjust this to an existing wifi connection!):
    const connectionPath = '/org/freedesktop/NetworkManager/Settings/116'

    const existingConnection = new NetworkManager.Connection(nm.dbusType, nm.dbusConfig)
    await existingConnection.load(connectionPath)
    console.log('ID before:', existingConnection.connectionId)

    existingConnection.connectionId = CONFIG.ssid + ' (' + generateId() + ')'

    await existingConnection.save()
    console.log('ID after :', existingConnection.connectionId)

    console.log('==========')

    // -- CREATE NEW CONNECTION

    // creating new connection:
    console.log('Creating new connection ...')
    const newConnection = await nm.connections.createWifi(CONFIG.ssid, CONFIG.psk)
    console.log('Done.')
    console.log('New connection:')
    console.log('  id:  ', newConnection.connectionId)
    console.log('  path:', newConnection.dbusConfig.connectionPath)

    // Deleting connection:
    setTimeout(async () => {
        console.log('Deleting connection ...')
        await newConnection.delete()
        console.log('Done.')
    }, 5000)

}

main()

/**
 * Examples:
 *  - https://github.com/balena-io-playground/nm-create-ap-example/blob/c7cf14ba31a737c69c47d2993dfc352432b3cb1f/lib/nm.ts
 */