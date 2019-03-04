import {
  request
} from '../../utils/request'

export const requestUserServiceAdd = params => {
  return request('POST', '/api/user/service', params)
}

export const requestUserServiceQuery = params => {
  return request('GET', '/api/user/service', params)
}
