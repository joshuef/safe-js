import { 
    authorise
    , getAuthToken
    , getUserLongName
    , isTokenValid
    , manifest
    , sendAuthorisationRequest
    , setAuthToken
    , setUserLongName
 } from '../src/auth';



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
    
    
    // it( 'should call isTokenValid', () =>
    // {
    //     sinon.spy( auth, 'isTokenValid' );
    //     
    //     authorise( 'x', {} , isTokenValid );
    //     
    //     // expect( isTokenValid ).to.be.called;
    //     isTokenValid.restore();
    // 
    // } );
});  








describe ( 'getAuthToken', () => 
{
    it ( 'should exist', () => 
    {
        expect( getAuthToken ).to.exist;
        expect( getAuthToken ).to.be.a.function;
    
    } );
});             
describe ( 'getUserLongName', () => 
{
    it ( 'should exist', () => 
    {
        expect( getUserLongName ).to.exist;
        expect( getUserLongName ).to.be.a.function;
        expect( getUserLongName ).to.not.throw ;
    } );
});   


describe ( 'isTokenValid', () => 
{
    it ( 'should exist', () => 
    {
        expect( isTokenValid ).to.exist;
        expect( isTokenValid ).to.be.a.function;
        expect( isTokenValid ).to.not.throw    ;
    } );
});             

describe ( 'manifest', () => 
{
    it ( 'should exist', () => 
    {
        expect( manifest ).to.exist;
        expect( manifest ).to.be.an.object;
    } );
});             

describe ( 'sendAuthorisationRequest', () => 
{
    it ( 'should exist', () => 
    {
        expect( sendAuthorisationRequest ).to.exist;
        expect( sendAuthorisationRequest ).to.be.a.function;
        expect( sendAuthorisationRequest ).to.not.throw    ;
    } );
}); 
       
describe ( 'setAuthToken', () => 
{
    it ( 'should exist', () => 
    {
        expect( setAuthToken ).to.exist;
        expect( setAuthToken ).to.be.a.function;
        expect( setAuthToken ).to.not.throw    ;
    } );
});             
describe ( 'setUserLongName', () => 
{
    it ( 'should exist', () => 
    {
        expect( setUserLongName ).to.exist;
        expect( setUserLongName ).to.be.a.function;
        expect( setUserLongName ).to.not.throw ;
    } );
});          
              