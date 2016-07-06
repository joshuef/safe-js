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

`safe.nfs` ,`safe.dns` and `safe.utils` are objects available for use. See source code for full methods at this stage.


### Examples

Auth:
```js
import * as safe from 'safe-js';
import packageData from '../package.json'

const TOKEN_KEY = 'BOOM';

const app =
{
    name: "name",
    id: "id",
    version: "v",
    vendor: "vendor_name"
};

safe.utils.authorise( TOKEN_KEY, app );
```

getFile:

```js
safe.nfs.createFile(token, 'primaryIndex.json', {} ,false, APP_FILES);
```

## Todo

- [ ] Test all available functions.
- [ ] Add tests
