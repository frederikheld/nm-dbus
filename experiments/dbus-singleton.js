'use strict'

const DBusObject = require('../lib/dbus-object')

const sysdbo1 = new DBusObject('system')
console.log('===')
const sysdbo2 = new DBusObject('system')
console.log('===')
const sessdbo1 = new DBusObject('session')
console.log('===')
const sysdbo3 = new DBusObject('system')
console.log('===')
const sessdbo2 = new DBusObject('session')
console.log('===')
const sysdbo4 = new DBusObject('system')
