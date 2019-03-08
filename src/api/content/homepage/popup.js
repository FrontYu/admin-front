import {
  getRequest
} from '../../../utils/request'

export const requestPopupQuery = params => {
  return getRequest('GET', '/api/content/homepage/popup', params)
}
