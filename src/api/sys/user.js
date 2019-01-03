import {
  request
} from '../../utils/request'

export const requestSysUserQuery = params => {
  return request('/api/sys/user/query', params)
}
