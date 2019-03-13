import {
  request
} from '../../utils/request'

export const requestProductQuery = params => {
  return request('GET', '/api/product/product', params)
}


export const requestProductManageQuery = params => {
  return request('GET', '/api/product/productlist', params)
}
