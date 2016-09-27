'use strict';

export const VERSION = '0.5';
export const SERVER = 'http://localhost:8100/' + VERSION + '/';

export const parseResponse = (response) => {
  let parsedResponse = response.json()
    .then((json) =>
    {
      response.__parsedResponseBody__ = json;
      return response;
    });
  return (parsedResponse || response);
};
