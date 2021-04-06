'use strict'

const chai = require('chai')

chai.should()
const expect = chai.expect

const dbus = require('dbus-next')

const Device = require('../lib/device')
const AccessPoints = require('../lib/access-points')

describe ('Device', () => {
    describe ('Sub-module access', () => {
        describe ('device.accessPoints', () => {
            it ('Should provide access to an instance of AccessPoints', () => {
                const device = new Device({}, 'system', {
                    dbusName: 'foo.bar',
                    dbusPath: '/foo/bar',
                    dbusPropertiesName: '/props'
                })
                const accessPoints = device.accessPoints
                expect(accessPoints).to.be.instanceOf(AccessPoints)
            })
        })
    })
})