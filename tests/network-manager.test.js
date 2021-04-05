'use strict'

const chai = require('chai')

chai.should()
const expect = chai.expect

const { NetworkManager, Device } = require('../lib/network-manager')

describe ('Module import', () => {
    it ('Should provide submodule access via static methods', () => {
        expect(() => {
            const NetworkManager = require('../lib/network-manager')

            const nm = new NetworkManager()
            const device = new NetworkManager.Device()
            const connection = new NetworkManager.Connection()
        }).to.not.throw()
    })

    it ('Should provide module destructuring', () => {
        expect(() => {
            const { NetworkManager, Device, Connection } = require('../lib/network-manager')

            const nm = new NetworkManager()
            const device = new Device()
            const connection = new Connection()
        }).to.not.throw()
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

describe('Get available devices with NM.listDevices()', () => {

})

// describe ('Device factory NetworkManager.getDevice()', () => {
//     it ('Should return an object of type \'Device\'', () => {
//         const device = NetworkManager.getDevice()
//     })
// })