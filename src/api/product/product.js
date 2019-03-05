import {
  request
} from '../../utils/request'

export const requestProductQuery = params => {
  return request('GET', '/api/product/product', params)
}
