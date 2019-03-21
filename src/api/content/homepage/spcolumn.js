import {
  request,
  getRequest
} from '../../../utils/request'

export const requestSPColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/spcolumn', params)
}

export const requestSPColumnAdd = params => {
  return request('POST', '/api/content/homepage/spcolumn', params)
}

export const requestSPColumnUpdate = params => {
  return request('PUT', '/api/content/homepage/spcolumn', params)
}

export const requestSPColumnDelete = params => {
  return request('DELETE', '/api/content/homepage/spcolumn', params)
}
