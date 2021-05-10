'use strict'

const chai = require('chai')

chai.should()

const objectDeepMerge = require('../lib/utils/object-deep-merge')

describe ('utils objectDeepMerge()', () => {
    it ('will merge objectB values over objectA values 1 level deep', () => {
        objectDeepMerge({}, {}).should.deep.equal({})

        objectDeepMerge({ foo: 'bar' }, {}).should.deep.equal({ foo: 'bar' })
        objectDeepMerge({}, { foo: 'bar' }).should.deep.equal({ foo: 'bar' })

        objectDeepMerge({ foo: 'bar' }, { foo: 'baz' }).should.deep.equal({ foo: 'baz' })
        objectDeepMerge({ foo: 'bar', dings: 'bums' }, { foo: 'baz' }).should.deep.equal({ foo: 'baz', dings: 'bums' })
        objectDeepMerge({ foo: 'bar' }, { foo: 'baz', dings: 'bums' }).should.deep.equal({ foo: 'baz', dings: 'bums' })
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

        objectDeepMerge(objectA, objectB).should.deep.equal(expectedResult)
    })

    it('will merge objectB values over objectA values 3 levels deep (which proves the recursive nature)', () => {
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

        objectDeepMerge(objectA, objectB).should.deep.equal(expectedResult)
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
        objectDeepMerge(sourceObjectA, sourceObjectB).should.deep.equal(expectedResult)

        // check if source and reference are still equal:
        sourceObjectA.should.deep.equal(resultObjectA)
        sourceObjectB.should.deep.equal(resultObjectB)

    })

    it ('will overwrite arrays entirely (no overwriting of indices)', () => {
        objectDeepMerge({ 'foo': [1, 2, 3] }, { 'foo': ['5'] }).should.deep.equal({ 'foo': ['5'] })
    })

    it ('will overwrite objects with primitives', () => {
        objectDeepMerge({ 'foo': { a: '1' } }, { 'foo': 3 }).should.deep.equal({ 'foo': 3 })
    })

    it ('will overwrite primitives with nested objects', () => {
        objectDeepMerge({ 'foo': 3 }, { 'foo': { 'a': { 'foo': 'bar' } } }).should.deep.equal({ 'foo': { 'a': { 'foo': 'bar' } } })
    })
})