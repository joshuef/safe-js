'use strict';

export const VERSION = '0.5';
export const SERVER = 'http://localhost:8100/' + VERSION + '/';
export const SD_DEFAULT_TYPE_TAG = 500;// UNVERSIONED

export const parseResponse = (response) => {
  let parsedResponse = response.json()
    .then((json) =>
    {
      response.__parsedResponseBody__ = json;
      return response;
    });
  return (parsedResponse || response);
};
