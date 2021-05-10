'use strict'

const dbus = require('dbus-next')
const NetworkManager = require('../lib/network-manager')

async function main() {
    const nm = new NetworkManager()

    const additionalDbusSettings = {
        connection: {
            autoconnect: false
        }
    }

    const connection = await nm.connections.createWifiClient('foo', 'barbarbar', additionalDbusSettings)

    console.log('connection.dbusSettings:', connection.dbusSettings)

}

main()
