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

const dirName = 'boom' + i ;
const fileName = 'file' + i ;
i++;
const dirName2 = 'boom' + i ;
const fileName2 = 'file' + i ;
i++;
const dirName3 = 'boom' + i ;
const fileName3 = 'file' + i ;


// NFS
safejs.auth.authorise(app).then( authResponse => {
    
    console.log( "Auth response:", authResponse );
    token = authResponse.token;

})
.then( () => {

    return safejs.nfs.createDir( token, dirName ).then( response =>
        {
            console.log( "createDir", response );
        });
})
.then( () => {

    return safejs.nfs.createDir( token, dirName2 ).then( response =>
        {
            console.log( "second createDir", response );
        });
        
    
})
.then( () => {
    
    return safejs.nfs.createFile( token, dirName + '/' + fileName, 'filename1' ).then( response =>
        {
            console.log( "creating file", response );
        });
})
.then( () => {
    
    return safejs.nfs.getFileMetadata( token, dirName + '/' + fileName ).then( response =>
    {
        console.log( "metadata retreived", response  );
    });
    
})
.then( () => {
    return safejs.nfs.getFile( token, dirName + '/' + fileName, 'text' ).then( text =>
    {
        console.log('GET file before updated text:',text); 
        return text;
    });
    
})
.then( () => {
    return safejs.nfs.createOrUpdateFile( token, dirName + '/' + fileName, 'thisisupdatedContent' ).then( response =>
    {
        console.log( "createOrUpdateFile existing file:", response );
        
        return response;
    });
    
})
.then( () => {
    return safejs.nfs.getFile( token, dirName + '/' + fileName, 'text' ).then( text =>
    {
        console.log('check file after update:',text)
        return text;
    });
    
})
.then( () => {
    
    return safejs.nfs.createOrUpdateFile( token, dirName + '/' + fileName + 'nuevo', 'thisisSUPERFRESH' ).then( response =>
        {
            console.log( "createOrUpdateFile/update on a new file:", response );
            return response;
        });
    
})
.then( () => {
    
    return safejs.nfs.getFile( token, dirName + '/' + fileName + 'nuevo', 'text' ).then( text =>
    {
        console.log('get new file',text)
        return text;
    });
    
})
.then( () => {
    return safejs.nfs.getDir( token, dirName ).then( response =>
    {
        console.log( "get dir", response );
        return response;

    });
    
})
.then( () => {
    
    return safejs.nfs.moveFile( token, 'app', dirName + '/' + fileName, 'app', dirName2 ).then( response =>
        {
            console.log( "moveFile", response );
            return response;

        });
    })
.then( () => {
    
    return safejs.nfs.renameFile( token, dirName2 + '/' + fileName, fileName2, 'lala' ).then( response =>
        {
            console.log( "renameFile:", response );
            return response;

        });
    
})
.then( () => {
    
    return safejs.nfs.renameDir( token, dirName2, dirName3 ).then( response =>
        {
            console.log( "renameDir:", response );
            return response;

        });
    
})
.then( () => {
    return safejs.nfs.deleteFile( token, dirName3 + '/' + fileName2 ).then( response =>
    {
        console.log( "deleteFile:", response );
        return response;

    });
    
    })
.then( () => {

    return safejs.nfs.deleteDir( token, dirName3 ).then( response =>
        {
            console.log( "deleteDir:", response );
            return response;

        });
    
})
.catch( err =>
    {
        console.log( "Houston, we have a problem...", err );
    });

