# TECHNICAL DEBT

This is a list of technical debt I left to not get distracted from making the first walking skeleton.

I started to investigate those issues but found out that they are not trivial to fix and require further investigation.

> Contributions very welcome! Especially if you have experience with one of those issues and find it trivial to fix ;-)

One heading per issue. A description of the issue, the current workaround and sources to continue investigation should be provided.

## Program not exiting / mocha --exit

Something keeps the tests running to infinity. This is an issue with the program itself and it needs to be fixed because it might keep a lot of processes open when called in the API.

See this GitHub issue to understand the reason for this https://github.com/dbusjs/node-dbus-next/issues/69

Apparently it is intended that the dbus connections never terminate as they need to keep listening for incoming messages (which is not a use case for this library yet). As all dbus.sessionBus() and dbus.systemBus() connect to the same dbus-daemon, this might not even be an issue.

Nevertheless this needs further investigation! We need to check if it is okay to keep it that way or if we need to disconnect from the bus explicitly.

The current workaround for tests is to run `mocha` with the `--exit` option.

For more information see:

* On Mocha
    * https://stackoverflow.com/questions/50372866/mocha-not-exiting-after-test
* On possible fixes
    * https://stackoverflow.com/questions/29333017/ecmascript-6-class-destructor

## Tests run against the real DBus

Tests should run in an isolated environment and all dependencies should be mocked away. I didn't consider it feasible to mock away DBus calls (becaus I don't understand enough about the internals of DBus) and I failed to run Ubuntu with a working DBus daemon in a container.

Currently tests are running on the real machine against the real DBus. This comes with further drawbacks, e. g. I can't set up devies to test against without messing with my (or my fellow developers) system :-|

For more information see:

* There's a branch [freature/test-in-isolated-environment](https://github.com/frederikheld/nm-dbus/tree/feature/test-in-isolated-environment) that has the current state of my approach where I left it (it doesn't work yet)
