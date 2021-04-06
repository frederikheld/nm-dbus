# TECHNICAL DEBT

This is a list of technical debt I left to not get distracted from making the first walking skeleton.

I started to investigate those issues but found out that they are not trivial to fix and require further investigation.

> Contributions very welcome! Especially if you have experience with one of those issues and find it trivial to fix ;-)

One heading per issue. A description of the issue, the current workaround and sources to continue investigation should be provided.

## Mocha --exit

Something keeps the tests running to infinity. I'm not sure if this is an issue with the tests or with the program itself. But it needs to be fixed.

The current workaround is to run `mocha` with the `--exit` option.

For more information see:

* https://stackoverflow.com/questions/50372866/mocha-not-exiting-after-test


## Tests run against the real DBus

Tests should run in an isolated environment and all dependencies should be mocked away. I didn't consider it feasible to mock away DBus calls (becaus I don't understand enough about the internals of DBus) and I failed to run Ubuntu with a working DBus daemon in a container.

Currently tests are running on the real machine against the real DBus. This comes with further drawbacks, e. g. I can't set up devies to test against without messing with my (or my fellow developers) system :-|

For more information see:

* There's a branch [freature/test-in-isolated-environment](https://github.com/frederikheld/nm-dbus/tree/feature/test-in-isolated-environment) that has the current state of my approach where I left it (it doesn't work yet)
