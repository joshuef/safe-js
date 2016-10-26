import { 
    createDir
    , createFile
    , deleteDir
    , deleteFile
    , getDir
    , getFile
    , rename
    , renameDir
    , renameFile
    , manifest
} from '../src/nfs';

// import fetch from 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import chaiAsPromised from 'chai-as-promised';

chai.use( chaiAsPromised );

describe ( 'nfs.js', () => 
{
    afterEach( () =>
    {
        fetchMock.restore();
    });
    
    
    
    
    describe ( 'createDir', () => 
    {
        it ( 'should return a promise' );

        it ( 'should exist', () => 
        {
            expect( createDir ).to.exist;
            expect( createDir ).to.be.a.function;
            expect( createDir ).to.not.throw    ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should reject with error upon fail' );
    });             
    
    
    
    describe ( 'deleteDir', () => 
    {
        it ( 'should exist', () => 
        {
            expect( deleteDir ).to.exist;
            expect( deleteDir ).to.be.a.function;
        } );
        
        it( 'should not throw errors', () =>
        {
            expect( deleteDir ).to.not.throw;
        } );
        
        
        
        it( 'should throw errors if no token');
        it( 'should throw errors if no longname string');
        it( 'should throw errors if type mismatch ');
        it( 'should check payload sent with fetch is correct ');
        
        // it( 'should return a true with a 200 response', ( done ) =>
        // {
        //     fetchMock.post('*', 200 );
        //         
        //     deleteDir( 'x', 'y' )
        //         .catch( done )
        //         .then( response => {
        //             expect( response ).to.exist;
        //             expect( response ).to.be.true;
        //             done();
        //         } )
        //         
        // 
        // } );
        // 
        // it( 'should return an error with a non 400 response', ( done ) =>
        // {
        //     fetchMock.post('*', 400 );
        //         
        //     deleteDir( 'x', 'y' )
        //         .catch( err => 
        //         {
        //             expect( err ).to.exist;
        //             expect( err ).to.be.a.string;
        //             expect( err ).to.match(/^SAFE deleteDir failed with status 400/);
        //             done();
        //         } );
        //                 
        // } );
    });  




    
    
    
    
    describe ( 'createFile', () => 
    {
        it ( 'should exist', () => 
        {
            expect( createFile ).to.exist;
            expect( createFile ).to.be.a.function;
        
        } );
        
        it ( 'should return a promise' );
        it ( 'should fail when missing params' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON' );
        it ( 'should resolve an array of LongNames' );
        it ( 'should have a headercode of 200 on success' );
        it ( 'should reject with error upon fail' );
    });            
    
     
    
    describe ( 'deleteFile', () => 
    {
        it ( 'should exist', () => 
        {
            expect( deleteFile ).to.exist;
            expect( deleteFile ).to.be.a.function;
            expect( deleteFile ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
    
     
    
    describe ( 'getDir', () => 
    {
        it ( 'should exist', () => 
        {
            expect( getDir ).to.exist;
            expect( getDir ).to.be.a.function;
            expect( getDir ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
    
     
    
    describe ( 'getFile', () => 
    {
        it ( 'should exist', () => 
        {
            expect( getFile ).to.exist;
            expect( getFile ).to.be.a.function;
            expect( getFile ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
     
    
    describe ( 'getFileMetadata', () => 
    {
        it ( 'should exist', () => 
        {
            expect( getFile ).to.exist;
            expect( getFile ).to.be.a.function;
            expect( getFile ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid HEADERS object on success' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
    
    
    describe ( 'manifest', () => 
    {
        it ( 'should exist', () => 
        {
            expect( manifest ).to.exist;
            expect( manifest ).to.be.an.object;
        } );
    });         
    
    
    
    describe ( 'rename', () => 
    {
        it ( 'should exist', () => 
        {
            expect( rename ).to.exist;
            expect( rename ).to.be.a.function;
            expect( rename ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
    
    
    describe ( 'renameDir', () => 
    {
        it ( 'should exist', () => 
        {
            expect( renameDir ).to.exist;
            expect( renameDir ).to.be.a.function;
            expect( renameDir ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
    
    describe ( 'renameFile', () => 
    {
        it ( 'should exist', () => 
        {
            expect( renameFile ).to.exist;
            expect( renameFile ).to.be.a.function;
            expect( renameFile ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should resolve an array of service names' );

        it ( 'should reject with error upon fail' );
    });   
    
    
    
    

});
