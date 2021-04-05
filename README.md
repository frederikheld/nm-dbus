# nm-dbus

Provides simplified access to NetworkManager features via DBus

> Note: This is in a very very early stage and not recommended for any other use than contributing to development!

## Testing

Tests are executed against the real DBus daemon. If your system provides DBus, you can execute them with

```
$ npm run test
```

> Note: this is the minimal viable approach to be able to test this code. To make this free from side effects, tests should run in an isolated environment like a Docker container. It turned out that this is not trivial to achieve with DBus so I gave up. I would be happy to receive a Pull Request that allows to run those tests in an isolated environment!

