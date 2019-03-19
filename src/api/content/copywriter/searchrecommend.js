import {
  request,
  getRequest
} from '../../../utils/request'

export const requestSearchRecommendQuery = params => {
  return getRequest('GET', '/api/content/copywriter/searchrecommend', params)
}

export const requestSearchRecommendAdd = params => {
  return request('POST', '/api/content/copywriter/searchrecommend', params)
}

export const requestSearchRecommendUpdate = params => {
  return request('PUT', '/api/content/copywriter/searchrecommend', params)
}

export const requestSearchRecommendDelete = params => {
  return request('DELETE', '/api/content/copywriter/searchrecommend', params)
}
