import {
  request,
  getRequest
} from '../../../utils/request'

export const requestColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/column', params)
}


export const requestColumnAdd = params => {
  return request('POST', '/api/content/homepage/column', params)
}

export const requestColumnUpdate = params => {
  return request('PUT', '/api/content/homepage/column', params)
}

export const requestColumnDelete = params => {
  return request('DELETE', '/api/content/homepage/column', params)
}

export const requestColumnTypeQuery = params => {
  return getRequest('GET', '/api/content/homepage/columntype', params)
}
