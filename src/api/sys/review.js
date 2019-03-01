import {
  request
} from '../../utils/request'

export const requestSysReviewQuery = params => {
  return request('GET', '/api/sys/review/query', params)
}
