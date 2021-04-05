'use strict'

class Child {
    constructor (message) {
        console.log('child constructor')
        this.message = message
    }

    printMessage () {
        console.log(this.message)
    }
}

module.exports = Child