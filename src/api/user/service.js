import {
  request,
  getRequest
} from '../../utils/request'

export const requestUserServiceAdd = params => {
  return request('POST', '/api/user/service', params)
}

export const requestUserServiceQuery = params => {
  return getRequest('GET', '/api/user/service', params)
}

export const requestUserServiceUpdate = params => {
  return request('PUT', '/api/user/service', params)
}

export const requestUserServiceDelete = params => {
  return request('DELETE', '/api/user/service', params)
}
