import {
  request
} from '../../utils/request'

export const requestCouponRecordQuery = params => {
  return request('GET', '/api/coupon/record', params)
}
