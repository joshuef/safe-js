import { 
    addService
    , createLongName
    , listLongNames
    , listServices
    , manifest
} from '../src/dns';

// import fetch from 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import chaiAsPromised from 'chai-as-promised';

chai.use( chaiAsPromised );

describe ( 'dns.js', () => 
{
    afterEach( () =>
    {
        fetchMock.restore();
    });
    
    
    
    
    describe ( 'addService', () => 
    {
        it ( 'should return a promise' );

        it ( 'should exist', () => 
        {
            expect( addService ).to.exist;
            expect( addService ).to.be.a.function;
            expect( addService ).to.not.throw    ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should reject with error upon fail' );
    });             
    
    
    
    describe ( 'createLongName', () => 
    {
        it ( 'should exist', () => 
        {
            expect( createLongName ).to.exist;
            expect( createLongName ).to.be.a.function;
        } );
        
        it( 'should not throw errors', () =>
        {
            expect( createLongName ).to.not.throw;
        } );
        
        
        
        it( 'should throw errors if no token');
        it( 'should throw errors if no longname string');
        it( 'should throw errors if type mismatch ');
        it( 'should check payload sent with fetch is correct ');
        
        it( 'should return a true with a 200 response', ( done ) =>
        {
            fetchMock.post('*', 200 );
                
            createLongName( 'x', 'y' )
                .catch( done )
                .then( response => {
                    expect( response ).to.exist;
                    expect( response ).to.be.true;
                    done();
                } )
                
        
        } );
        
        it( 'should return an error with a non 400 response', ( done ) =>
        {
            fetchMock.post('*', 400 );
                
            createLongName( 'x', 'y' )
                .catch( err => 
                {
                    expect( err ).to.exist;
                    expect( err ).to.be.a.string;
                    expect( err ).to.match(/^SAFE createLongName failed with status 400/);
                    done();
                } );
                        
        } );
    });  




    
    
    
    
    describe ( 'listLongNames', () => 
    {
        it ( 'should exist', () => 
        {
            expect( listLongNames ).to.exist;
            expect( listLongNames ).to.be.a.function;
        
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON' );
        it ( 'should resolve an array of LongNames' );
        it ( 'should have a headercode of 200 on success' );
        it ( 'should reject with error upon fail' );
    });            
    
     
    
    describe ( 'listServices', () => 
    {
        it ( 'should exist', () => 
        {
            expect( listServices ).to.exist;
            expect( listServices ).to.be.a.function;
            expect( listServices ).to.not.throw ;
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
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

});
