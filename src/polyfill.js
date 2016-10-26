import * as safejs from './index'

if( ! window.safeAuth )
{
    window.safeAuth = safejs.auth;
}

if( ! window.safeNFS )
{
    window.safeNFS = safejs.nfs;
}

if( ! window.safeDNS )
{
    window.safeDNS = safejs.dns;
}

if( ! window.safeStructuredData )
{
    window.safeStructuredData = safejs.structuredData;
}

if( ! window.safeAppendableData )
{
    window.safeAppendableData = safejs.appendableData;
}

if( ! window.safeDataId )
{
    window.safeDataId = safejs.dataId;
}

if( ! window.safeCipherOpts )
{
    window.safeCipherOpts = safejs.cipherOpts;
}

if( ! window.safeSignKey )
{
    window.safeSignKey = safejs.signKey;
}

if( ! window.safeImmutableData )
{
    window.safeImmutableData = safejs.signKey;
}

