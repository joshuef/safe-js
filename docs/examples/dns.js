import * as safejs from '../../src';

// Testing of Safejs against the real launcher.
const app =
{
    name: "safejs-nfs-tests",
    id: "safejs",
    version: "x",
    vendor: "josh wilson",
    permissions: ["SAFE_DRIVE_ACCESS"]
};


let token;

let i = Math.round( Math.random() * 10000 );

const LONGNAME = 'ourlongname';


safejs.auth.authorise(app, 'boom').then( authResponse => {
    
    token = authResponse.token;
})
.then( () => {
    
    return safejs.dns.createLongName( token, LONGNAME ).then( response =>
        {
            console.log( "longNameResponse", response );
        });
    
})
.then( () => {
    
    return safejs.dns.addService( token, LONGNAME, 'www','/www/html', true ).then( response =>
        {
            console.log( "addService", response );
        });
    
})
.then( () => {
    return safejs.dns.listLongNames( token ).then( list =>
        {
            console.log( "listLongNames", list );
        });
    
})
.then( () => {
    return safejs.dns.listServices( token, 'ourlongname' ).then( list =>
        {
            console.log( "listServices", list );
        });
    
})
.catch( err =>
    {
        console.log( "WE HAVE A PROBLEM", err );
    }
    
)
