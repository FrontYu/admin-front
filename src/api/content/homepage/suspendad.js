import {
  getRequest
} from '../../../utils/request'

export const requestSuspendAdQuery = params => {
  return getRequest('GET', '/api/content/homepage/suspendad', params)
}
