# Delphin

Delphin is a place where you *register a single domain in the easiest way*.

It’s built with JavaScript – a very light [Node.js](https://nodejs.org) server, [React.js](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [Webpack](https://webpack.github.io/), and many other wonderful libraries.

## Getting started

1. Make sure you have `git`, `node`, and `npm` installed
2. Clone this repository locally with `git@github.com:Automattic/delphin.git`
3. Execute `npm start` to install packages and start the server
4. Add `127.0.0.1 delphin.localhost` to your `hosts` file
5. Open http://delphin.localhost:1337 in your browser

## Coding Guidelines

For now, our coding guidelines mirror [Calypso's guidelines](https://github.com/Automattic/wp-calypso/blob/master/docs/coding-guidelines.md).

## Browser Support

We support the latest two versions of all major browsers, except IE, where we currently only support 11 and Edge (see [Browse Happy](http://browsehappy.com) for current latest versions).

## Testing

You can execute tests with `npm test`.

Code in `/lib` and `/reducers` should have unit tests. Moreover these tests should live in a `/test` directory inside the corresponding module. We use [Jest](https://facebook.github.io/jest/) for writing tests and encourage [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD).
