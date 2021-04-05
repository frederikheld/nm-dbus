'use strict'

const chai = require('chai')
const Device = require('../lib/device')
const NetworkManager = require('../lib/network-manager')

chai.should()
const expect = chai.expect

describe ('Devices', () => {
    describe ('list()', () => {      
        it ('Should return a list of available network devices', async () => {
            const nm = new NetworkManager()
            const listOfdevices = await nm.devices.list()
            expect(listOfdevices).to.be.an.instanceOf(Array).with.length.greaterThan(0) // TODO: this assumes that there's at least one network device available!
            expect(listOfdevices.every((item) => {
                return item instanceof Device
            }))
        })
    })
})