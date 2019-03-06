import {
  getRequest
} from '../../utils/request'


export const requestUserManageQuery = params => {
  return getRequest('GET', '/api/user/manage', params)
}
