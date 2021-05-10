'use strict'

const chai = require('chai')

chai.should()

const mergeDbusSettings = require('../lib/utils/dbus-settings').mergeDbusSettings

describe ('utils.dbus-settings mergeDbusSettings()', () => {
    it ('will merge objectB values over objectA values 1 level deep', () => {
        mergeDbusSettings({}, {}).should.deep.equal({})

        mergeDbusSettings({ foo: 'bar' }, {}).should.deep.equal({ foo: 'bar' })
        mergeDbusSettings({}, { foo: 'bar' }).should.deep.equal({ foo: 'bar' })

        mergeDbusSettings({ foo: 'bar' }, { foo: 'baz' }).should.deep.equal({ foo: 'baz' })
        mergeDbusSettings({ foo: 'bar', dings: 'bums' }, { foo: 'baz' }).should.deep.equal({ foo: 'baz', dings: 'bums' })
        mergeDbusSettings({ foo: 'bar' }, { foo: 'baz', dings: 'bums' }).should.deep.equal({ foo: 'baz', dings: 'bums' })
    })

    it ('will merge objectB values over objectA values 2 levels deep', () => {
        const objectA = {
            foo: 'bar',
            dings: {
                a: 1,
                b: 2
            }
        }

        const objectB = {
            dings: {
                a: 3, // changed
                c: 'hello' // added
            }
        }

        const expectedResult = {
            foo: 'bar',
            dings: {
                a: 3,
                b: 2,
                c: 'hello'
            }
        }

        mergeDbusSettings(objectA, objectB).should.deep.equal(expectedResult)
    })

    it('will merge objectB values over objectA values 3 levels deep (which proves its recursive nature)', () => {
        const objectA = {
            foo: 'bar',
            dings: {
                a: 1,
                b: {
                    '1': 'a',
                    '2': 'b'
                }
            }
        }

        const objectB = {
            dings: {
                b: {
                    '2': 'fish' // changed
                }
            }
        }

        const expectedResult = {
            foo: 'bar',
            dings: {
                a: 1,
                b: {
                    '1': 'a',
                    '2': 'fish'
                }
            }
        }

        mergeDbusSettings(objectA, objectB).should.deep.equal(expectedResult)
    })

    it ('will not mutate the source objects', () => {
        const sourceObjectA = {
            foo: 'bar',
            dings: {
                a: 1,
                b: 2
            }
        }

        const sourceObjectB = {
            dings: {
                a: 3,
                c: 'hello'
            }
        }
        const resultObjectA = {
            foo: 'bar',
            dings: {
                a: 1,
                b: 2
            }
        }

        const resultObjectB = {
            dings: {
                a: 3,
                c: 'hello'
            }
        }

        const expectedResult = {
            foo: 'bar',
            dings: {
                a: 3,
                b: 2,
                c: 'hello'
            }
        }

        // check that source and reference are actually equal:
        sourceObjectA.should.deep.equal(resultObjectA)
        sourceObjectB.should.deep.equal(resultObjectB)

        // perform deep merge:
        mergeDbusSettings(sourceObjectA, sourceObjectB).should.deep.equal(expectedResult)

        // check if source and reference are still equal:
        sourceObjectA.should.deep.equal(resultObjectA)
        sourceObjectB.should.deep.equal(resultObjectB)

    })

    it ('will overwrite arrays entirely (no overwriting of indices)', () => {
        mergeDbusSettings({ 'foo': [1, 2, 3] }, { 'foo': ['5'] }).should.deep.equal({ 'foo': ['5'] })
    })

    it ('will overwrite objects with primitives', () => {
        mergeDbusSettings({ 'foo': { a: '1' } }, { 'foo': 3 }).should.deep.equal({ 'foo': 3 })
    })

    it ('will overwrite primitives with nested objects', () => {
        mergeDbusSettings({ 'foo': 3 }, { 'foo': { 'a': { 'foo': 'bar' } } }).should.deep.equal({ 'foo': { 'a': { 'foo': 'bar' } } })
    })
})