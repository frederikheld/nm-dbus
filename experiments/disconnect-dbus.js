'use strict'

async function main() {
    const NetworkManager = require('../lib/network-manager')

    const nm = new NetworkManager()

    setTimeout(async () => {

        try {
            await nm.disconnect()
        } catch (error) {
            console.error(error)
        }

        console.log('Done.')

    }, 2000)
}

main()