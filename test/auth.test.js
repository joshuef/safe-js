import { 
    authorise
    , isTokenValid
    , manifest
 } from '../src/auth';

// import fetch from 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import chaiAsPromised from 'chai-as-promised';

chai.use( chaiAsPromised );


describe ( 'auth.js', () => 
{
    
    afterEach( () =>
    {
        fetchMock.restore();
    });
    
    
    describe ( 'authorise', () => 
    {
        it ( 'should exist', () => 
        {
            expect( authorise ).to.exist;
            expect( authorise ).to.be.a.function;
        } );
        
        it( 'should not throw errors', () =>
        {
            expect( authorise ).to.not.throw;
        } );
        
        
        
        it( 'should return a valid response object', ( done ) =>
        {
            fetchMock.post('*', {hello: 'world'});
                
            authorise( 'x' )
                .catch( done )
                .then( response => {
                    expect( response ).to.exist;
                    done();
                } )
                
            fetchMock.restore();
        
        } );
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
        it ( 'should reject with error upon fail' );
    });  


    describe ( 'isTokenValid', () => 
    {
        it ( 'should exist', () => 
        {
            expect( isTokenValid ).to.exist;
            expect( isTokenValid ).to.be.a.function;
            expect( isTokenValid ).to.not.throw    ;
        } );
        
        it( 'should return true when valid', ( done ) =>
        {
            fetchMock.get('*', 200 );
            
            isTokenValid('xxx')
                .catch( done )
                .then( validity => 
                {                
                    expect(validity).to.be.true;
                    done();
                })    
        })
        
        it( 'should fail when response is 401', ( done ) =>
        {
            fetchMock.get('*', 401 );
            
            isTokenValid('xxx')
                .catch( done )
                .then( validity => 
                {                
                    expect(validity).to.be.false;
                    done();
                })    
        })
        
        it ( 'should return a promise' );
        it ( 'should send the correct headers / info in payload' );
        it ( 'should resolve to valid JSON object' );
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
      
              