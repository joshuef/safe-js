# SAFE-js 0.5

Isomorphic adaptation of API hooks found in the [safe demo app](https://github.com/maidsafe/safe_examples).

Built using [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) so it should work in node or in the browser.

Currently super-alpha. Limited tests done so far, but auth and create file endpoints work. This is currently mostly a learning project for the SAFE api.

If it's useful and you find problems (you will), PRs are welcome!

## Use

Grab it

`npm i safe-js --save`

And use it

`import * as safe from 'safe-js';`

Available methods are taken from the demo app, and docs (which are currently not up to date) live here: https://maidsafe.readme.io/docs/introduction .

`safe.nfs` ,`safe.dns` and `safe.auth` are objects available for use.

Alternatively you can  access these same methods in the [Safe Beaker Browser (SBB)] (https://github.com/joshuef/beaker/), via `window.safeAuth`, `window.safeNFS` and `window.DNS`;

## Examples

Auth:
```js
import * as safe from 'safe-js';
import packageData from '../package.json'

const LOCAL_STORAGE_TOKEN_KEY = 'BOOM';

const app =
{
    name: "name",
    id: "id",
    version: "v",
    vendor: "vendor_name"
};

safe.utils.authorise( app, LOCAL_STORAGE_TOKEN_KEY );
```

getFile:

```js
safe.nfs.createFile(token, 'primaryIndex.json', {} ,false, APP_DIR);
```


## API

### safeAuth.authorise

Authorises the app with the SAFE launcher.

-  `packageData` - Object containing your app information. This is how the application will appear in the launcher.
- `tokenKey` - Optional string to ID the returned auth token in localStorage (NB. with SBB you'll need to manually save this to the browser's localStorage)

eg: 

```js
let app = {
   name: '',
   id: '',
   version: '',
   vendor: ''
  }
  
safeAuth.authorise( app )

```





## Todo

- [ ] Get all functions stable available functions.
- [ ] Add documentation.
- [ ] Add mocha tests.
