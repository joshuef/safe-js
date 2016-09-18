import { auth } from '../src';


describe('auth.js', function () {

    it('it should exist', function () {
        expect( auth ).to.exist;
        
    });
});  




describe ( 'authorise', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.authorise ).to.exist;
        expect( auth.authorise ).to.be.a.function;
    } );
    
    it( 'should not throw errors', () =>
    {
        expect( auth.authorise ).to.not.throw;
    } );
    
    
    // it( 'should call isTokenValid', () =>
    // {
    //     sinon.spy( auth, 'isTokenValid' );
    //     
    //     auth.authorise( 'x', {} , auth.isTokenValid );
    //     
    //     // expect( auth.isTokenValid ).to.be.called;
    //     auth.isTokenValid.restore();
    // 
    // } );
});  








describe ( 'getAuthToken', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.getAuthToken ).to.exist;
        expect( auth.getAuthToken ).to.be.a.function;
    
    } );
});             
describe ( 'getUserLongName', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.getUserLongName ).to.exist;
        expect( auth.getUserLongName ).to.be.a.function;
        expect( auth.getUserLongName ).to.not.throw ;
    } );
});   


describe ( 'isTokenValid', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.isTokenValid ).to.exist;
        expect( auth.isTokenValid ).to.be.a.function;
        expect( auth.isTokenValid ).to.not.throw    ;
    } );
});             

       
describe ( 'setAuthToken', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.setAuthToken ).to.exist;
        expect( auth.setAuthToken ).to.be.a.function;
        expect( auth.setAuthToken ).to.not.throw    ;
    } );
});             
describe ( 'setUserLongName', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.setUserLongName ).to.exist;
        expect( auth.setUserLongName ).to.be.a.function;
        expect( auth.setUserLongName ).to.not.throw ;
    } );
});          
describe ( 'sendAuthorisationRequest', () => 
{
    it ( 'should exist', () => 
    {
        expect( auth.sendAuthorisationRequest ).to.exist;
        expect( auth.sendAuthorisationRequest ).to.be.a.function;
        expect( auth.sendAuthorisationRequest ).to.not.throw    ;
    } );
}); 
              