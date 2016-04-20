App
===

This directory contains all modules necessary to Delphin that are not specific to the client or server.

## `actions/`

Contains action creators that are used when dispatching actions with Redux.

## `components/`

Contains all of the components used in Delphin, separated into `ui/` and `container/` components.

## `lib/`

A catch-all directory for Delphin-specific modules that are too specific to this project to live in the top level `lib/`.

## `reducers/`

Contains all reducers that consume data from the aforementioned actions, building the global state tree.
