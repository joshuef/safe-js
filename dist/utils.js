import fetch    from 'isomorphic-fetch';

const SERVER = 'http://localhost:8100/'

const TOKEN_KEY         = 'MaidSafeDemoAppTokenReplaceThis';
const LONG_NAME_KEY     = 'MaidSafeDemoAppLongNameReplaceThis';
const dnsList           = null;

export const setAuthToken = function( tokenKey = TOKEN_KEY, token)
{
    localStorage.setItem( tokenKey, token );
};

export const getAuthToken = function( tokenKey = TOKEN_KEY )
{
    return localStorage.getItem( tokenKey );
};

export const setUserLongName = function(longNameKey = LONG_NAME_KEY, longName) {
    localStorage.setItem(longNameKey, longName);
};

export const getUserLongName = function( longNameKey = LONG_NAME_KEY ) {
    return localStorage.getItem(longNameKey);
};

export const sendAuthorisationRequest = function( tokenKey, packageData = {} ) {

    if( !packageData.productName ||
        !packageData.identifier ||
        !packageData.version ||
        !packageData.author )
        {
            throw new Error( 'safe.auth.sendAuthorisationRequest needs package data');
            return;
        }

        let url = SERVER + 'auth';
        var payload = {
            method: 'POST',
            data: {
                app: {
                    name: packageData.productName,
                    id: packageData.identifier,
                    version: packageData.version,
                    vendor: packageData.author
                },
                permissions: []
            }
        };

        return fetch( url, payload )
        .then( (response) => {
            if (response.status !== 200 && response.status !== 206)
            {
                console.debug('safe.auth.sendAuthorisationRequest failed with status ' + response.status + ' ' + response.statusText );
            }

            const body = response.body;
            const headers = response.headers;

            if (!body && !headers)
            {

                console.debug('safe.auth.sendAuthorisationRequest failed to connect to Launcher');
                return('Unable to connect Launcher');
            }


            setAuthToken( tokenKey, body.token);

            return response
        });;
    };

    var isTokenValid = function( tokenKey, token ) {
        var token = token || getAuthToken( tokenKey );
        if (!token) {
            return ('No token found');
        }

        let url = SERVER + 'auth';
        var payload = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        };

        return fetch( url, payload )
        .then( (response) => {
            if (response.status !== 200 || response.status !== 401  )
            {
                console.debug('safe.auth.isTokenValid failed with status ' + response.status + ' ' + response.statusText );
            }

            // if( response.status === 200 )
            // {
            //     return true;
            //
            // }
            // else {
            //     return false;
            // }
            return response;
        });;
    };

    // authorise application
    export const authorise = function( token )
    {
        return isTokenValid( token ).then( response => {
            if ( !response || response.error ) {
                localStorage.clear();
                return sendAuthorisationRequest();
            }
            return response;
        });
    };
