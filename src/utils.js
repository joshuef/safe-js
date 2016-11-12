'use strict';

export const VERSION = '0.5';
export const SERVER = 'http://localhost:8100/' + VERSION + '/';
export const SD_DEFAULT_TYPE_TAG = 500;// UNVERSIONED
export const ROOT_PATH =
{
    APP: 'app',
    DRIVE: 'drive'
};

const failParsing = response => 
{
    //handle unauthorised requests
    if( response.status === 401 )
    {
        return Promise.reject( new Error ( response.statusText ) );
    }
    
    return response.clone().json().then( json => 
    {
        return Promise.reject( new Error (  json  ) );
    }) ;
}


export const parseResponse = (response) =>
{
    if( response.status !== 200 )
    {
        return failParsing( response );
    }
    else 
    {    
        return response.json()
    }
};


export const checkBooleanResponse = ( response ) =>
{    
    if( response.status !== 200 )
    {
        return failParsing( response );
    }
    else 
    {
	    return true;
    }

}