import request from '../utils/request'

export const y = params => {
  return request('/api/sys/user/query', params)
}
