'use strict'

const chai = require('chai')

chai.should()
const expect = chai.expect

const AccessPoint = require('../lib/access-point')
const { NetworkManager } = require('../lib/network-manager')

describe ('AccessPoint', () => {
    describe ('Getters', () => {
        describe ('ssid()', () => {
            it ('converts the Byte ssid to a String', () => {
                const nm = new NetworkManager()

                const stringSSIDs = [
                    'Foo',
                    'Funny WiFi Name',
                    'Pretty fly for a Wi-Fi',
                    'Mom, click here for internet!',
                    'Why not Zoidberg?',
                    'Stop making noise at 4am in the morning!'
                ]

                const byteSSIDs = stringSSIDs.map ((string) => {
                    return Buffer.from(string)
                })

                for (const i in stringSSIDs) {
                    const aP = new AccessPoint({
                        Ssid: { value: byteSSIDs[i] }
                    }, nm.dbusType, nm.dbusProperties)
                    expect(aP.ssid).to.equal(stringSSIDs[i])
                }
            })
        })

        describe ('frequencyString()', () => {
            it ('converts the frequency Number to a String that represents the frequency band', () => {
                const nm = new NetworkManager()

                const frequencies900MHz = [755, 900, 928]
                const frequencies2point4GHz = [2401, 2495]
                const frequencies5GHz = [5030, 5895]
                const frequenciesUnknown = [754, 929, 2300, 2496, 5029, 5896]

                // test 900 MHz range:
                for (const freq of frequencies900MHz) {
                    const aP = new AccessPoint({
                        Frequency: { value: freq }
                    }, nm.dbusType, nm.dbusProperties)
                    expect(aP.frequencyString).to.equal('900 MHz')
                }

                // test 2.4 GHz range:
                for (const freq of frequencies2point4GHz) {
                    const aP = new AccessPoint({
                        Frequency: { value: freq }
                    }, nm.dbusType, nm.dbusProperties)
                    expect(aP.frequencyString).to.equal('2.4 GHz')
                }

                // test 5 GHz range:
                for (const freq of frequencies5GHz) {
                    const aP = new AccessPoint({
                        Frequency: { value: freq }
                    }, nm.dbusType, nm.dbusProperties)
                    expect(aP.frequencyString).to.equal('5 GHz')
                }

                // test unknown ranges:
                for (const freq of frequenciesUnknown) {
                    const aP = new AccessPoint({
                        Frequency: { value: freq }
                    }, nm.dbusType, nm.dbusProperties)
                    expect(aP.frequencyString).to.equal('?')
                }

            })
        })
    })

})