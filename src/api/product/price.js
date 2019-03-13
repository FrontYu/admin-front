import {
  request
} from '../../utils/request'

export const requestProductPriceQuery = params => {
  return request('GET', '/api/product/price', params)
}
