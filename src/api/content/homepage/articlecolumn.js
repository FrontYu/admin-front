import {
  getRequest
} from '../../../utils/request'

export const requestArticleColumnQuery = params => {
  return getRequest('GET', '/api/content/homepage/articlecolumn', params)
}
