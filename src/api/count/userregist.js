import {
  getRequest
} from "../../utils/request";

export const requestCountUserRegistQuery = params => {
  return getRequest('GET', '/api/count/userregist', params).then((data) => {
    return data
  })
}
