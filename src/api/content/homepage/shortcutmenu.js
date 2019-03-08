import {
  getRequest
} from '../../../utils/request'

export const requestShortCutMenuQuery = params => {
  return getRequest('GET', '/api/content/homepage/shortcutmenu', params)
}
