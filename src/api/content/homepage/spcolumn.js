import {
  getRequest
} from '../../../utils/request'

export const requestSPColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/spcolumn', params)
}
