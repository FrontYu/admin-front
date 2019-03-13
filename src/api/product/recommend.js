import {
  request
} from '../../utils/request'

export const requestProductRecommendQuery = params => {
  return request('GET', '/api/product/recommend', params)
}
