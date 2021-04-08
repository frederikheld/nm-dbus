'use strict'

const chai = require('chai')
const Device = require('../lib/device')
const NetworkManager = require('../lib/network-manager')

chai.should()
const expect = chai.expect

describe ('Devices', () => {
    describe ('getAll()', () => {      
        it ('Should return a list of available network devices', async () => {
            const nm = new NetworkManager()
            const devices = await nm.devices.getAll()
            expect(devices).to.be.an.instanceOf(Array).with.length.greaterThan(0) // TODO: this assumes that there's at least one network device available!
            expect(devices.every((item) => {
                return item instanceof Device
            }))
        }).timeout(20000)
    })

    describe ('getWireless()', () => {
        it ('Should return a list of only devices that have a wireless interface', async () => {
            const nm = new NetworkManager()
            const wirelessDevices = await nm.devices.getWireless()
            for (const [i, device] of wirelessDevices.entries()) {
                expect(await device.hasWirelessInterface()).to.equal(true)
            }
        })
    })
})
