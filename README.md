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

### auth.js
#### authorise 

[Authorise the app](https://api.safedev.org/auth/authorize-app.html) with the SAFE launcher. If a `tokenKey` is passed it will check for an existing token in localstorage, if a valid key is found, it will

-  `packageData` - Object containing your app information. This is how the application will authorised in the launcher. 
- `tokenKey` - Optional string to ID the returned auth token in localStorage (NB. with SBB you'll need to manually save this to the browser's localStorage)

eg: 

```js
let app = {
   name: '',
   id: '',
   version: '',
   vendor: '',
   permissions: [],
  }
  
safeAuth.authorise( app )

```

##### Promise Return
Returns an object of the form:
```js
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Im5RT1poRFJ2VUFLRlVZMzNiRTlnQ25VbVVJSkV0Q2lmYk4zYjE1dXZ2TlU9In0.OTKcHQ9VUKYzBXH_MqeWR4UcHFJV-xlllR68UM9l0b4",
    "permissions": [
        "SAFE_DRIVE_ACCESS"
    ]
}
```

If the current token was valid, `permissions` will be omitted.

#### getAuthToken

Returns the token stored at `tokenKey` in localStorage

- `tokenKey` - string to ID the auth token in localStorage

#### getUserLongName

Returns the longName stored at `LongNameKey` in localStorage

- `LongNameKey` - string to ID the long name key in localStorage


#### isTokenValid

Check if an app token is valid. 

- `token` - Auth token string.

Returns a promise, which returns a boolean of validity.

#### setAuthToken

Saves the token stored at `tokenKey` in localStorage


#### setUserLongName

Saves the userLongName stored at `longNameKey` in localStorage


#### sendAuthorisationRequest

Will authorise an app object on the network, as per `authorise` above, but does not first check for a token in localStorage.


## Todo

- [x] Add auth.js documentation.
- [ ] Add dns.js documentation.
- [ ] Add nfs.js documentation.
- [ ] Increase test coverage.
