import {
  request,
  getRequest
} from '../../../utils/request'

export const requestSuspendAdQuery = params => {
  return getRequest('GET', '/api/content/homepage/suspendad', params)
}
export const requestSuspendAdAdd = params => {
  return request('POST', '/api/content/homepage/suspendad', params)
}

export const requestSuspendAdUpdate = params => {
  return request('PUT', '/api/content/homepage/suspendad', params)
}

export const requestSuspendAdDelete = params => {
  return request('DELETE', '/api/content/homepage/suspendad', params)
}
