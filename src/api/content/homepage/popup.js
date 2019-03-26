import {
  request,
  getRequest
} from '../../../utils/request'

export const requestPopupQuery = params => {
  return getRequest('GET', '/api/content/homepage/popup', params)
}
export const requestPopupAdd = params => {
  return request('POST', '/api/content/homepage/popup', params)
}

export const requestPopupUpdate = params => {
  return request('PUT', '/api/content/homepage/popup', params)
}

export const requestPopupDelete = params => {
  return request('DELETE', '/api/content/homepage/popup', params)
}
