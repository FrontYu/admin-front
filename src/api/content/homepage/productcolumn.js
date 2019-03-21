import {
  request,
  getRequest
} from '../../../utils/request'

export const requestProductColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/productcolumn', params)
}
export const requestProductColumnAdd = params => {
  return request('POST', '/api/content/homepage/productcolumn', params)
}

export const requestProductColumnUpdate = params => {
  return request('PUT', '/api/content/homepage/productcolumn', params)
}

export const requestProductColumnDelete = params => {
  return request('DELETE', '/api/content/homepage/productcolumn', params)
}
