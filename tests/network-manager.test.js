'use strict'

const chai = require('chai')

chai.should()
const expect = chai.expect

const { NetworkManager, Connection, Device, Devices, Wireless } = require('../lib/network-manager')

describe ('Module import', () => {
    it ('Should provide direct submodule access', () => {
        expect(() => {
            const NetworkManager = require('../lib/network-manager')

            const nm = new NetworkManager()

            const connection = new NetworkManager.Connection()
            expect(connection).to.be.instanceOf(Connection)

            const device = new NetworkManager.Device()
            expect(device).to.be.instanceOf(Device)

            const devices = new NetworkManager.Devices(nm.bus, nm.dbusConfig)
            expect(devices).to.be.instanceOf(Devices)

            const wireless = new NetworkManager.Wireless()
            expect(wireless).to.be.instanceOf(Wireless)
        }).to.not.throw()
    })

    it ('Should provide module destructuring', () => {
        expect(() => {
            const { NetworkManager, Connection, Device, Devices } = require('../lib/network-manager')

            const nm = new NetworkManager()
            const connection = new Connection()
            const device = new Device()
            const devices = new Devices(nm.bus, nm.dbusConfig)
            const wireless = new Wireless()
        }).to.not.throw()
    })
})

describe ('Sub-module access', () => {
    describe ('nm.devices', () => {
        it ('Should provide access to an instance of Devices', () => {
            // const nm = new NetworkManager()
            // const devices = nm.devices
            // expect(devices).to.be.instanceOf(Devices)
        })
    })
})

// describe ('Setting the bus (system bus or session bus) via the constructor', () => {
//     it ('Should default to session bus', () => {
//         const nm = new NetworkManager()
//         // TODO: how can this be tested?
//     })

//     it ('Should create the bus passed as first parameter', () => {
//         const nmSession = new NetworkManager('session')
//         // TODO: how can this be tested?

//         const nmSystem = new NetworkManager('system')
//         // TODO: how can this be tested?
//     })

//     it ('Should throw an error if the bus type is not supported', () => {
//         expect (() => {
//             new NetworkManager('unsupported-bus-type')
//         }).to.throw(Error)
//     })
// })

// describe ('Device factory NetworkManager.getDevice()', () => {
//     it ('Should return an object of type \'Device\'', () => {
//         const device = NetworkManager.getDevice()
//     })
// })