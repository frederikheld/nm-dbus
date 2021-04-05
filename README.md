# nm-dbus

Provides simplified access to NetworkManager features via DBus

> Note: This is in a very very early stage and not recommended for any other use than contributing to development!

## Testing

Tests are executed against the real DBus daemon. If your system provides DBus, you can execute them with

```
$ npm run test
```

> Note: this is the minimal viable approach to be able to test this code. To make this free from side effects, tests should run in an isolated environment like a Docker container. It turned out that this is not trivial to achieve with DBus so I gave up. I would be happy to receive a Pull Request that allows to run those tests in an isolated environment!

To avoid side effects, this package comes with a Docker setup that allows to run the test in an isolated environment.

> This requires `docker` to be installed! See the Docker docs for [installation instructions](https://docs.docker.com/get-docker/)!

Before you run the tests for the first time, you have to build the Docker container with

```
$ npm run test:init
```

After that, tests can be executed with

```
$ npm run test:isolated
```

During development you can use

```
$ npm run test:protected-dev
```

instead to automatically re-run tests when changes are detected.

