'use strict'

const NetworkManager = require('../lib/network-manager')

async function main () {

    const nm = new NetworkManager()

    // get all devices and list only iface name:
    console.log('\nALL CONNECTIONS:')
    const connections = await nm.connections.getAll()
    for (const connection of connections) {
        console.log(connection.dbusConfig.connectionPath)
    }

    const selectedConnectionPath = connections[3].connectionPath

    console.log('\CONNECTIONS OBJECT BY PATH:')
    const connection = await nm.connections.getByPath(selectedConnectionPath)
    console.log(connection)

    console.log('\nCONNECTIONS BY ID:')

    const connectionsById = await nm.connections.getById('^[Ff]') // all connections starting with lower case or upper case f
    const ids = connectionsById.map(connectionObject => connectionObject.connectionId)
    console.log(ids)

    nm.disconnect()

}

main()