import {
  getRequest
} from '../../../utils/request'

export const requestProductColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/productcolumn', params)
}
