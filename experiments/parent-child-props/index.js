'use strict'

const Parent = require('./parent')

const p = new Parent('foo')
p.child.printMessage()