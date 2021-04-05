'use strict'

const chai = require('chai')

// chai.should()
const expect = chai.expect

const { DeviceNotFoundError, NoWirelessInterfaceError } = require('../lib/errors')

describe ('Custom Errors', () => {
    describe ('Module import', () => {
        it ('Should provide module destructuring', () => {
            expect(() => {
                const { DeviceNotFoundError, NoWirelessInterfaceError } = require('../lib/errors')
            }).to.not.throw()
        })
    })

    describe ('DeviceNotFoundError', () => {
        it ('should be derived from Error class', () => {
            const dnfError = new DeviceNotFoundError()
            expect(dnfError instanceof Error).to.be.true
        })
    })

    describe ('NoWirelessInterfaceError', () => {
        it ('should be derived from Error class', () => {
            const nwiError = new NoWirelessInterfaceError()
            expect(nwiError instanceof Error).to.be.true
        })
    })
})