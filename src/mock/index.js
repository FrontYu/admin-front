import Mock from 'mockjs'

export default {
  mockData() {
    Mock.mock('/api/user/login', {
      'success': true,
      'result': {
        'token': 'asdfghjkl'
      }
    })
    Mock.mock('/api/user/logout', {
      'success': true,
      'result': {
        'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
      }
    })

    Mock.mock('/api/user/register', {
      'success': true,
      'result': {}
    })

    Mock.mock('/api/user/info', {
      'success': true,
      'result': {
        'id': '12138',
        'name': 'spring',
        'roles': ['admin'],
        'permissions': [{
          path: '/index'
        }, {
          path: '/table'
        }, {
          path: '/forms/base'
        }, {
          path: '/forms/edit'
        }, {
          path: '/user/password'
        }, {
          path: '/about'
        }]
      },
      'error': {
        'code': 100000,
        'message': '无效的token'
      }
    })
    Mock.mock('/api/user/changePassword', {
      'success': true,
      'result': {
        'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
      }
    })
    Mock.mock('/api/user/query', {
      'success': true,
      'result': {
        'data|30-60': [{
          'name|1': [Mock.mock('@cname'), Mock.mock('@cname'), Mock.mock('@cname'), Mock.mock('@cname')],
          'date|1': [Mock.mock('@date("yyyy-MM-dd")'), Mock.mock('@date("yyyy-MM-dd")'), Mock.mock('@date("yyyy-MM-dd")')],
          'address|1': [Mock.mock('@county(true)'), Mock.mock('@county(true)'), Mock.mock('@county(true)')]
        }]
      }
    })

    Mock.mock('/api/sys/user/query', {
      'success': true,
      'result': {
        'data|20': [{
          'realName|1': [Mock.mock('@cname')],
          'userName|1': [Mock.mock('@name')],
          'email|1': [Mock.mock('@email')],
          'phone|1': /^1[385][1-9]\d{8}/
        }]
      }
    })
  }
}
