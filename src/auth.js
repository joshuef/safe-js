import fetch    from 'isomorphic-fetch';

const VERSION           = '0.5';
const SERVER            = 'http://localhost:8100/' + VERSION + '/';
const TOKEN_KEY         = 'MaidSafeDemoAppTokenReplaceThis';
const LONG_NAME_KEY     = 'MaidSafeDemoAppLongNameReplaceThis';
const dnsList           = null;


// localStorage shim for node
if( typeof localStorage === 'undefined' )
{
    var boom = 'aye';
    var localStorage = {
        getItem : function(item) {
            return this[ item ];
        },
        setItem : function( key, item ) {
            this[ key ] = item;
        },
        clear : function()
        {
            return true;
        }
    };
}

/*
* Manifest for Beaker: 
* https://github.com/pfrazee/beaker/blob/master/doc/authoring-plugins.md#api-manifests
*/
export const manifest = {
    getAuthToken                : 'sync',
    getUserLongName             : 'sync',
    setAuthToken                : 'sync',
    setUserLongName             : 'sync',
    sendAuthorisationRequest    : 'promise',
    isTokenValid                : 'promise',
    authorise                   : 'promise'
}



export const getAuthToken = function( tokenKey = TOKEN_KEY )
{
    return localStorage.getItem( tokenKey );
};

export const getUserLongName = function( longNameKey = LONG_NAME_KEY, localStorage ) {
    return localStorage.getItem(longNameKey);
};

export const setAuthToken = function( tokenKey = TOKEN_KEY, token)
{
    localStorage.setItem( tokenKey, token );
};

export const setUserLongName = function(longNameKey = LONG_NAME_KEY, longName) {
    localStorage.setItem(longNameKey, longName);
};

export const sendAuthorisationRequest = function( tokenKey, packageData = {} )
{
    const url = SERVER + 'auth';

    let authData = {
        app: {
            name: packageData.name,
            id: packageData.id,
            version: packageData.version,
            vendor: packageData.vendor
        },
        permissions: []
    }

    var payload = {
        method: 'POST',
        headers: {
           'content-type': 'application/json'
         },
        body: JSON.stringify( authData )
    };

    return fetch( url, payload )
    .then((response) => {
          let parsedResponse
          if(response.status == 200) {
            parsedResponse = response.json()
              .then((json) => {
                response.__parsedResponseBody__ = json

                return response
              })
          }

          return (parsedResponse || response)
    })
    .then( response => {
        if (response.status !== 200 && response.status !== 206)
        {
            throw new Error( 'SAFE sendAuthorisationRequest failed with status ' +
                response.status + ' ' + response.statusText );
        }

        const body          = response.body;
        const headers       = response.headers;
        const receivedToken = response.__parsedResponseBody__.token;

        if (!body && !headers)
        {

            throw new Error( 'SAFE sendAuthorisationRequest failed to connect to Launcher');
        }


        if( !receivedToken )
        {
            throw new Error( 'SAFE sendAuthorisationRequest failed to parse token from response');
        }

        setAuthToken( tokenKey, receivedToken);

        return response
    });
};

export const isTokenValid = function( tokenKey = TOKEN_KEY  ) {
    let url = SERVER + 'auth';
    let token = getAuthToken( tokenKey );
    var payload = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };

    return fetch( url, payload )
    .then( (response) => {
        if (response.status !== 200 && response.status !== 401  )
        {
            throw new Error( 'SAFE isTokenValid failed with status ' + response.status + ' ' + response.statusText );
        }
        return response;
    });
};

// authorise application
export const authorise = function( tokenKey = TOKEN_KEY, packageData )
{
    return isTokenValid( tokenKey )
        .then( response => {

            if ( !response || response.error || response.status === 401 ) {
                localStorage.clear();
                return sendAuthorisationRequest( tokenKey, packageData );
            }
            return response;
        });
};
