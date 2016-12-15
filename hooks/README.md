Hooks
=====

The `manage.js` script is used to manage Git hooks, e.g. to lint code.

#### Installing

You can pass hook names using the `-i` option to enable linting:

```
yarn run hooks -- -i pre-commit
yarn run hooks -- -i pre-commit -i pre-push
```


#### Uninstalling

You can use the `-u` option to uninstall a specific Git hook:


```
yarn run hooks -- -u pre-commit
```
