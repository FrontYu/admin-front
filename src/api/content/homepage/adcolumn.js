import {
  request,
  getRequest
} from '../../../utils/request'

export const requestAdColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/adcolumn', params)
}
export const requestAdColumnAdd = params => {
  return request('POST', '/api/content/homepage/adcolumn', params)
}

export const requestAdColumnUpdate = params => {
  return request('PUT', '/api/content/homepage/adcolumn', params)
}

export const requestAdColumnDelete = params => {
  return request('DELETE', '/api/content/homepage/adcolumn', params)
}
