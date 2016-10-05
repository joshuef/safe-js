'use strict';

import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import {parseResponse, SERVER, SD_DEFAULT_TYPE_TAG} from './utils';

const SD_ENDPOINT = SERVER + 'structured-data/';

export const manifest = {
  create: 'promise',
  getHandle: 'promise',
  getDataIdHandle: 'promise',
  put: 'promise',
  post: 'promise',
  readData: 'promise',
  updateData: 'promise',
  dropHandle: 'promise',
  serialise: 'promise',
  deserialise: 'promise',
  remove: 'promise',
  getMetaData: 'promise'
};

/**
 *
 * @param token
 * @param name
 * @param typeTag
 * @param data- as base64 string
 * @param cipherOptsHandle
 */
export const create = (token, name, typeTag = SD_DEFAULT_TYPE_TAG, data, cipherOptsHandle) => {
  if (typeof name === 'string') {
    name = crypto.createHash('sha256').update(name).digest('base64');
  }
  const body = {
    name: name,
    typeTag: typeTag,
    cipherOpts: cipherOptsHandle,
    data: data
  };
  const payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return fetch(SD_ENDPOINT, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'StructuredData creation failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : SD_ENDPOINT
        });
      }
      return parseResponse(response);
    });
};

export const updateData = (token, handleId, data, cipherOptsHandle) => {
  const body = {
    data: data,
    cipherOpts: cipherOptsHandle
  };
  const payload = {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  const url = SD_ENDPOINT + handleId;
  return fetch(url, payload).then(response => {
    if (response.status !== 200)
    {
      throw new Error({ error: 'Update StructuredData failed with status ' + response.status + ' ' + response.statusText,
        errorPayload: payload,
        errorUrl : url
      });
    }
    return response;
  });
};

export const getHandle = (token, dataIdHandle) => {
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  const url = SD_ENDPOINT + 'handle/' + dataIdHandle;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error(JSON.stringify({ error: 'Get StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        }));
      }
      return parseResponse(response);
    });
};

export const getDataIdHandle = (token, handleId) => {
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  const url = SD_ENDPOINT + 'data-id/' + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get DataId handle of StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const put = (token, handleId) => {
  const payload = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  const url = SD_ENDPOINT + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'PUT of StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const post = (token, handleId) => {
  const payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
  const url = SD_ENDPOINT + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'PUT of StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const readData = (token, handleId) => {
  var url = SD_ENDPOINT + handleId;
  var payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    }
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Read StructuredData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response.buffer();
    })
};

export const dropHandle = (token, handleId) => {
  const payload = {
    method: 'DELETE'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  const url = SD_ENDPOINT + 'handle/' + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Drop StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const serialise = (token, handleId) => {
  const url = `${SD_ENDPOINT}serialise/${handleId}`;
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Serialise StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response.buffer();
    });
};

export const deserialise = (token, data) => {
  const url = `${SD_ENDPOINT}deserialise`;
  const payload = {
    method: 'POST',
    body: data
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Deserialise StructuredData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};

export const remove = (token, handleId) => {
  const url = `${SD_ENDPOINT}${handleId}`;
  const payload = {
    method: 'DELETE'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Delete StructuredData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const getMetaData = (token, handleId) => {
  const url = `${SD_ENDPOINT}metadata/${handleId}`;
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      'Authorization':'Bearer ' + token
    };
  }
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Get StructuredData meta data failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};
