import {
  request,
  getRequest
} from '../../utils/request'


export const requestUserFeedbackQuery = params => {
  return getRequest('GET', '/api/user/feedback', params)
}

export const requestUserFeedbackDelete = params => {
  return request('DELETE', '/api/user/feedback', params)
}
