'use strict';

import crypto from 'crypto';
import fetch from 'isomorphic-fetch';
import {parseResponse, SERVER} from './utils';

const AD_ENDPOINT = SERVER + 'appendable-data/';

export const manifest = {
  create: 'promise',
  getHandle: 'promise',
  getDataIdHandle: 'promise',
  put: 'promise',
  post: 'promise',
  getDataIdAt: 'promise',
  append: 'promise',
  getMetadata: 'promise',
  isSizeValid: 'promise',
  removeAt: 'promise',
  addToFilter: 'promise',
  removeFromFilter: 'promise',
  getSignKeyAt: 'promise',
  clearAll: 'promise',
  serialise: 'promise',
  deserialise: 'promise',
  dropHandle: 'promise',
  getEncryptKey: 'promise',
  dropEncryptKeyHandle: 'promise',
  toggleFilter: 'promise',
  restore: 'promise',
};

/**
 *
 * @param token
 * @param name
 * @param isPrivate
 * @param filterType - BlackList or WhiteList
 * @param filterKeys
 */
export const create = (token, name, isPrivate, filterType = 'BlackList', filterKeys = []) => {
  if (typeof name === 'string') {
    name = crypto.createHash('sha256').update(name).digest('base64');
  }
  const body = {
    name: name,
    isPrivate: isPrivate,
    filterType: filterType,
    filterKeys: filterKeys
  };
  const payload = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return fetch(AD_ENDPOINT, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'AppendableData creation failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : AD_ENDPOINT
        });
      }
      return parseResponse(response);
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
  const url = AD_ENDPOINT + 'handle/' + dataIdHandle;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get AppendableData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return parseResponse(response);
    });
};


export const isSizeValid = (token, handleId) => {
  const payload = {
    method: 'GET'
  };
  if (token) {
    payload.headers = {
      Authorization: 'Bearer ' + token
    };
  }
  const url = AD_ENDPOINT + 'validate-size/' + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Validating AppendableData size failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
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
  const url = AD_ENDPOINT + 'data-id/' + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'Get DataId handle of AppendableData failed with status ' + response.status + ' ' + response.statusText,
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
  const url = AD_ENDPOINT + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'PUT of AppendableData failed with status ' + response.status + ' ' + response.statusText,
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
  const url = AD_ENDPOINT + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error({ error: 'POST of AppendableData failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const getDataIdAt = (token, handleId, index, fromDeleted = false) => {
  var url = AD_ENDPOINT + (fromDeleted ? 'deleted-data/' : '') + handleId + '/' + index;
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
        throw new Error( 'Fetch DataId from AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    });
};

export const append = (token, handleId, dataIdHandle) => {
  var url = AD_ENDPOINT + handleId + '/' + dataIdHandle;
  var payload = {
    method: 'PUT',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Append to AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const getMetadata = (token, handleId) => {
  var url = AD_ENDPOINT + 'metadata/' + handleId;
  var payload = {
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
        throw new Error( 'Add to filter of AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    });
};

export const addToFilter = (token, handleId, signKeys) => {
  var url = AD_ENDPOINT + 'filter/' + handleId;
  var payload = {
    method: 'PUT',
    headers: {
      'Authorization':'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signKeys)
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Remove from filter of AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const removeFromFilter = (token, handleId, signKeys) => {
  var url = AD_ENDPOINT + 'filter/' + handleId;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization':'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signKeys)
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Remove from filter of AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const getSignKeyAt = (token, handleId, index, fromDeleted) => {
  var url = AD_ENDPOINT + 'sign-key/' + (fromDeleted ? 'deleted-data/' : '') + handleId + '/' + index;
  var payload = {
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Get sign key from AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    });
};

export const removeAt = (token, handleId, index, fromDeleted) => {
  var url = AD_ENDPOINT + (fromDeleted ? 'deleted-data/' : '') + handleId + '/' + index;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Remove from AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const clearAll = (token, handleId, fromDeleted) => {
  var url = AD_ENDPOINT + (fromDeleted ? 'clear-deleted-data/' : 'clear-data/') + handleId;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error('Clear data from AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const serialise = (token, handleId) => {
  var url = AD_ENDPOINT + 'serialise/' + handleId;
  var payload = {
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
        throw new Error('Clear data from AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response.buffer();
    });
};

export const deserialise = (token, data) => {
  const url = `${AD_ENDPOINT}deserialise`;
  var payload = {
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
        throw new Error('Deserialise AppendableData handle id failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    });
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
  const url = AD_ENDPOINT + 'handle/' + handleId;
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( { error: 'Drop AppendableData handle failed with status ' + response.status + ' ' + response.statusText,
          errorPayload: payload,
          errorUrl : url
        });
      }
      return response;
    });
};

export const getEncryptKey = (token, handleId) => {
  var url = `${AD_ENDPOINT}encrypt-key/${handleId}`;
  var payload = {
    method: 'GET',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Get AppendableData encrypted key handle failed with status ' + response.status + ' ' + response.statusText );
      }
      return parseResponse(response);
    });
};

export const dropEncryptKeyHandle = (token, handleId) => {
  var url = `${AD_ENDPOINT}encrypt-key/${handleId}`;
  var payload = {
    method: 'DELETE',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Delete AppendableData encrypted key handle failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const toggleFilter = (token, handleId) => {
  var url = `${AD_ENDPOINT}toggle-filter/${handleId}`;
  var payload = {
    method: 'PUT',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Toggle AppendableData filter failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};

export const restore = (token, handleId, index) => {
  var url = `${AD_ENDPOINT}restore/${handleId}/${index}`;
  var payload = {
    method: 'PUT',
    headers: {
      'Authorization':'Bearer ' + token
    }
  };
  return fetch(url, payload)
    .then((response) => {
      if (response.status !== 200)
      {
        throw new Error( 'Restore AppendableData failed with status ' + response.status + ' ' + response.statusText );
      }
      return response;
    });
};
