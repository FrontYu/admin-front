import {
  getRequest
} from '../../../utils/request'

export const requestColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/column', params)
}
