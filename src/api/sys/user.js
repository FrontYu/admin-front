import {
  request
} from '../../utils/request'

export const requestSysUserQuery = params => {
  return request('GET', '/api/sys/user/query', params)
}
