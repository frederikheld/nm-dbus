#!/bin/sh

dbus-daemon --config-file=/usr/share/dbus-1/system.conf --print-address
npm run test