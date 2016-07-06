# SAFE-js

Isomorphic adaptation of API hooks found in the [safe demo app](https://github.com/maidsafe/safe_examples).

Built using [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) so it should work on node or in the browser.

Currently super-alpha. Limited tests done so far, but auth and create file endpoints work. This is currently mostly a learning project for the SAFE api.

If it's useful and you find problems (you will), PRs are welcome!

## Use

Grab it

`npm i safe-js --save`

And use it

`import * as safe from 'safe-js';`

Available methods are taken from the demo app, and docs (which are currently not up to date) live here: https://maidsafe.readme.io/docs/introduction .

## Todo

- [ ] Test all available functions.
- [ ] Add tests
