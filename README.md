# SAFE-js

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

`safe.nfs`
`safe.dns`
`safe.auth` 
`structuredData`
`appendableData`
`dataId`
`cipherOpts`
`signKey`

are objects available for use.

Alternatively you can  access these same methods in the [Safe Beaker Browser (SBB)] (https://github.com/joshuef/beaker/), via `window.safeAuth`, `window.safeNFS` and `window.DNS`;

### Polyfill

safe-js has a polyfill to create `window.safeXXX` functionality when it's not available (non `safe://` sites in [SAFE Beaker Browser](https://github.com/joshuef/beaker), for eg. ).

You can simply include this file in the `<head>` of your page during development and continue using the APIs as they are provided by Safe Beaker Browser.

```html
<head>
  <title>safejs site not yet on the network!</title>
  <!-- replace this link with the actual polyfill location -->
  <script src="./safe-js/dist/polyfill.js" ></script>            
</head>
```


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
    vendor: "vendor_name",
    permissions: ["SAFE_DRIVE_ACCESS"]
};

safe.utils.authorise( app );
```

getFile:

```js
safe.nfs.createFile(token, 'primaryIndex.json', {} ,false, APP_DIR);
```


## API

### auth.js
#### `authorise`

[Authorise the app](https://api.safedev.org/auth/authorize-app.html) with the SAFE launcher. If a `tokenKey` is passed it will check for an existing token in localstorage, if a valid key is found, it will

-  `packageData` - Object containing your app information. This is how the application will authorised in the launcher. 
- `tokenKey` - Optional string to ID the returned auth token in localStorage (SAfe browser will overwrite this with its own storage token)

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

#### `getAuthToken`

Returns the token stored at `tokenKey` in localStorage

- `tokenKey` - string to ID the auth token in localStorage

#### `getUserLongName`

Returns the longName stored at `LongNameKey` in localStorage

- `LongNameKey` - string to ID the long name key in localStorage


#### `isTokenValid`

Check if an app token is valid. 

- `token` - Auth token string.

Returns a promise, which returns a boolean of validity.

#### `setAuthToken`

Saves the token stored at `tokenKey` in localStorage


#### `setUserLongName`

Saves the userLongName stored at `longNameKey` in localStorage



### dns.js

#### `addService`

Creates a SAFE DNS Service. (https://api.safedev.org/dns/add-service.html)

- `token` - (`string`) -  auth token
- `longName` - longName to add service to.
- `serviceName` - Name of service to create.
- `isPathShared` - Name of service to create
- `serviceHomePathDir` - The full path of the directory to be served by this service.

Returns a promise which resolves as truthy upon success.


#### `createLongName`

Creates a SAFE DNS LongName / Public Id. (https://api.safedev.org/dns/create-long-name.html)

- `token` - (`string`) -  auth token
- `longName` - Name of service to create

Returns a promise which resolves as truthy upon success.


#### `getDns`

List all long names registered by current user (https://api.safedev.org/dns/list-long-names.html)

- `token` - (`string`) -  auth token

Returns a JSON array of long names.

```js
[
    "example",
    "test"
]
```

#### `listServices`

List all services associated with a long name registered by current user (https://api.safedev.org/dns/list-services.html)

- `token` - (`string`) -  auth token

Returns a JSON array of service names.

```js
[
    "www",
    "test"
]
```

### nfs.js
#### `createDir`

(https://api.safedev.org/nfs/directory/create-directory.html)

- `token` - (`string`) auth token
- `dirPath` - (`string`) full directory path
- `isPrivate` - (`bool`) is the data private?
- `metadata` - (`base64 string`) metadata for the dir.
- `isPathShared` - (`bool`) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves truthy upon success.


#### `createFile`

(https://api.safedev.org/nfs/file/create-file.html)

- `token` - (`string`) auth token
- `filePath` - (`string`) file path
- `dataToWrite` - data of file being uploaded
- `dataType` - (`string` - optional), type of data being uploaded. `text/plain` for example.
- `dataLength` - (`int` - optional) length of data being written.
- `metadata` - (`base64 string` - optional) metadata for the dir.
- `isPathShared` - (`bool` - optional) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves truthy upon success.

#### `deleteDir`

(https://api.safedev.org/nfs/directory/delete-directory.html)

- `token` - (`string`) auth token
- `dirPath` - (`string`) file path
- `isPathShared` - (`bool` - optional) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves truthy upon success.

> TODO? Remove isPathShared here and use only path string ( which would include app/drive?)

#### `deleteFile`

(https://api.safedev.org/nfs/file/delete-file.html)

- `token` - (`string`) auth token
- `filePath` - (`string`) file path
- `isPathShared` - (`bool` - optional) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves truthy upon success.




#### `getDir`

(https://api.safedev.org/nfs/directory/get-directory.html)

- `token` - (`string`) auth token
- `dirPath` - (`string`) file path
- `isPathShared` - (`bool` - optional) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves to a JSON object of dir info.

```js
{
    "info": {
        "name": "images",
        "isPrivate": true,
        "createdOn": "2016-09-26T04:41:05.342Z",
        "modifiedOn": "2016-09-26T04:41:05.342Z",
        "metadata": "c2FtcGxlIG1ldGFkYXRh"
    },
    "files": [],
    "subDirectories": []
}
```



#### `getFile`

Get a file. 

(https://api.safedev.org/nfs/file/get-file.html)

- `token` - (`string`) auth token
- `filePath` - (`string`) file path
- `isPathShared` - (`bool` - optional) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves to the file data upon success.



#### `rename`

Rename a file or dir. 

(https://api.safedev.org/nfs/directory/update-directory.html)
(https://api.safedev.org/nfs/file/update-file.html)

- `token` - (`string`) auth token
- `path` - (`string`) path
- `newName` - (`string`) new name
- `isFile` - (`bool`) `true` if it is a file and not a dir.
- `metadata` - (`base64 string` - optional) metadata for the dir.
- `isPathShared` - (`bool` - optional) `true` if writing to the shared`DRIVE`, `false` writes to `APP`;

Returns a Promise which resolves truthy upon success.

#### `renameDir`
(https://api.safedev.org/nfs/directory/update-directory.html)

Wrapper for `rename` with directory options set. Returns a Promise which resolves truthy upon success.

#### `renameFile`
(https://api.safedev.org/nfs/file/update-file.html)

Wrapper for `rename` with file options set. Returns a Promise which resolves truthy upon success.

### TODO

- [ ] NFS needs `move` endpoints


## Todo

- [x] Add auth.js documentation.
- [x] Add dns.js documentation.
- [x] Add nfs.js documentation.
- [ ] Improve documentation (clarity/readability/gitbook?).
- [ ] Increase test coverage.
- [ ] Ensure all API endpoints are represented.
- [ ] Update isPathShared to appOrDrive ? ... Something more semantic.


## License

MIT.
