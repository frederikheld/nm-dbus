'use strict'

const Child = require('./child.js')

class Parent {
    constructor (message) {
        this.message = message
        this.child = new Child(message)
    }

    // get child() {
    //     return this.child
    // }
}

module.exports = Parent