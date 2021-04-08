'use strict'

const chai = require('chai')
// const AccessPoints = require('../lib/access-points')
const AccessPoint = require('../lib/access-point')
const AccessPoints = require('../lib/access-points')
// const Device = require('../lib/device')
const NetworkManager = require('../lib/network-manager')

chai.should()
const expect = chai.expect

describe ('AccessPoints', () => {
    describe ('getAll()', () => {      
        it ('Should return a list of available access points', async () => {
            const nm = new NetworkManager()
            const devices = await nm.devices.getWireless()

            const device = devices[0]

            const accessPoints = await device.accessPoints.getAll()
            expect(accessPoints).to.be.an.instanceOf(Array).with.length.greaterThan(0)

            accessPoints.every((item) => {
                expect(item).to.be.an.instanceOf(AccessPoint)
            })
        }).timeout(20000)
    })
})
