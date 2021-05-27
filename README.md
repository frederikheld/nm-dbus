# nm-dbus

Provides simplified access to NetworkManager features via DBus

> Note: This is in a very very early stage and not recommended for any other use than contributing to development!

## Testing

Tests are executed against the real DBus daemon. If your system provides DBus, you can execute them with

```
$ npm run test
```

> Note: this is the minimal viable approach to be able to test this code. To make this free from side effects, tests should run in an isolated environment like a Docker container. I tried this, but it turned out that it is not trivial to achieve with DBus so I gave up. I would be happy to receive a Pull Request that allows to run those tests in an isolated environment!

### Prerequisites

As this repo doesn't come with a prepared isolated environment, you have to set up your own. Those are the prerequisites:

* `network-manager` is installed and running
* `dbus-daemon` is installed and running
* at least one network device available
* at least one of the network devices needs to have a wireless interface that connects to WiFi
* at least one visible wireless network in your vicinity
