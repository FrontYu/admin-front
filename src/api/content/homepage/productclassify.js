import {
  request,
  getRequest
} from '../../../utils/request'

export const requestProductClassifyQuery = params => {
  return getRequest('GET', '/api/content/homepage/productclassify', params)
}

export const requestProducClassifyAdd = params => {
  return request('POST', '/api/content/homepage/productclassify', params)
}

export const requestProductClassifyUpdate = params => {
  return request('PUT', '/api/content/homepage/productclassify', params)
}

export const requestProductClassifyDelete = params => {
  return request('DELETE', '/api/content/homepage/productclassify', params)
}
