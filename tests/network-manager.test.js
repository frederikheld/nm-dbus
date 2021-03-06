'use strict'

const chai = require('chai')

chai.should()
const expect = chai.expect

const NetworkManager = require('../lib/network-manager')
const Connection = require('../lib/connection')
const Connections = require('../lib/connections')
const Device = require('../lib/device')
const Devices = require('../lib/devices')
const Wireless = require('../lib/wireless')

describe ('NetworkManager', () => {
    describe ('Module import', () => {
        it ('Should provide direct submodule access', () => {
            expect(() => {
                const NetworkManager = require('../lib/network-manager')

                const nm = new NetworkManager()

                const connections = new NetworkManager.Connections(nm.dbusType, nm.dbusConfig)
                expect(connections).to.be.instanceOf(Connections)

                const connection = new NetworkManager.Connection(nm.dbusType, nm.dbusConfig, { })
                expect(connection).to.be.instanceOf(Connection)

                const devices = new NetworkManager.Devices(nm.dbusType, nm.dbusConfig)
                expect(devices).to.be.instanceOf(Devices)

                const device = new NetworkManager.Device(nm.dbusType, nm.dbusConfig)
                expect(device).to.be.instanceOf(Device)

                const wireless = new NetworkManager.Wireless(nm.dbusType, nm.dbusConfig)
                expect(wireless).to.be.instanceOf(Wireless)

                const { mergeDbusSettings, maskDbusSettings, dbusSettingsVariantTypes }  = NetworkManager.Utils.DbusSettings
                expect(mergeDbusSettings.name).to.equal('mergeDbusSettings')
                expect(maskDbusSettings.name).to.equal('maskDbusSettings')
                expect(dbusSettingsVariantTypes).to.be.instanceOf(Object)

                const { escapeRegExString } = NetworkManager.Utils.Strings
                expect(escapeRegExString.name).to.equal('escapeRegExString')

            }).to.not.throw()
        })

        it ('Should provide module destructuring', () => {
            expect(() => {
                const { NetworkManager, Connection, Device, Devices, Wireless } = require('../lib/network-manager')

                const nm = new NetworkManager()
                new Connections(nm.dbusType, nm.dbusConfig)
                new Connection(nm.dbusType, nm.dbusConfig, { })
                new Devices(nm.dbusType, nm.dbusConfig)
                new Device(nm.dbusType, nm.dbusConfig)
                new Wireless(nm.dbusType, nm.dbusConfig)
            }).to.not.throw()
        })
    })

    describe ('Sub-module access', () => {
        describe ('nm.connections', () => {
            it ('Should provide access to an instance of Connections', () => {
                const nm = new NetworkManager()
                const connections = nm.connections
                expect(connections).to.be.instanceOf(Connections)
            })
        })

        describe ('nm.devices', () => {
            it ('Should provide access to an instance of Devices', () => {
                const nm = new NetworkManager()
                const devices = nm.devices
                expect(devices).to.be.instanceOf(Devices)
            })
        })

        describe ('nm.wireless', () => {
            it ('Should provide access to an instance of Wireless', () => {
                const nm = new NetworkManager()
                const wireless = nm.wireless
                expect(wireless).to.be.instanceOf(Wireless)
            })
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