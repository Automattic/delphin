Server
======

This module is the entry point for the server build of Delphin. It starts an Express server, which serves either static assets or a page from the app.

The module itself:

- Initializes i18n.
- Sets up path handlers.
- Renders a React component, if the requested URL matches one of the routes in [`app/routes`](../app/routes.js).
- Creates an instance of [`webpack-dev-server`](https://webpack.github.io/docs/webpack-dev-server.html) in the development environment.
