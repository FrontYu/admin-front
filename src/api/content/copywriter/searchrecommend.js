import {
  getRequest
} from '../../../utils/request'

export const requestSearchRecommendQuery = params => {
  return getRequest('GET', '/api/content/copywriter/searchrecommend', params)
}
