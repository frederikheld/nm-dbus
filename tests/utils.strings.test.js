'use strict'

const chai = require('chai')
chai.should()
const expect = chai.expect

const dbus = require('dbus-next')

const escapeRegExString = require('../lib/utils/strings').escapeRegExString

describe ('utils.strings', () => {
    describe ('escapeRegExString()', () => {
        it ('will mask all RegEx special chars with two backslashes', () => {
            escapeRegExString('[]').should.equal('\\[\\]')
            escapeRegExString('^$').should.equal('\\^\\$')
            escapeRegExString('*+?.').should.equal('\\*\\+\\?\\.')
            escapeRegExString('()').should.equal('\\(\\)')
            escapeRegExString('{}').should.equal('\\{\\}')
            escapeRegExString('/\\').should.equal('\\/\\\\')
        })
    })
})