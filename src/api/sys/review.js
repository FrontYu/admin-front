import {
  request
} from '../../utils/request'

export const requestSysReviewQuery = params => {
  return request('/api/sys/review/query', params)
}
