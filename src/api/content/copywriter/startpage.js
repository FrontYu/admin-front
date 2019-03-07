import {
  getRequest
} from '../../../utils/request'

export const requestStartPageQuery = params => {
  return getRequest('GET', '/api/content/copywriter/startpage', params)
}
