'use strict';

export const VERSION = '0.5';
export const SERVER = 'http://localhost:8100/' + VERSION + '/';
export const SD_DEFAULT_TYPE_TAG = 500;// UNVERSIONED
export const ROOT_PATH =
{
    APP: 'app',
    DRIVE: 'drive'
};



export const parseResponse = (response) =>
{
    if( response.status !== 200 )
    {
        
        return response.clone().json().then( json => 
        {
            return Promise.reject( json );
        }) 
    }

    return response.json()
};


export const checkBooleanResponse = ( response ) =>
{
    // console.log( "RESPONSEE?????", response );
    
    if( response.status !== 200 )
    {
        return response.clone().json().then( json => 
        {
            return Promise.reject( json );
        }) 
    }
    else {
	       return true;
    }

}