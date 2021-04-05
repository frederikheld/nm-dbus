'use strict'

const chai = require('chai')

chai.should()

describe ('smoke test', () => {
    it('should run the test', () => {
        'hello world'.should.equal('hello world')
    })
})