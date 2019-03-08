import {
  getRequest
} from '../../../utils/request'

export const requestProductClassifyQuery = params => {
  return getRequest('GET', '/api/content/homepage/productclassify', params)
}
